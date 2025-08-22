import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../shared/models/User';
import { Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_LOGIN_URL, USERS_REGISTER_URL } from '../shared/models/constants/urls';
import{ ToastrService} from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable:Observable<User>;

  constructor(private http: HttpClient,private toastrService :ToastrService  ) { //userObservable is just a readonly version of userSubject which we will expose it outside the userservice
    this.userObservable = this.userSubject.asObservable();
    if (typeof window !== 'undefined' && localStorage) {
    const storedUser = this.getUserFromLocalStorage();
    this.userSubject.next(storedUser);
  } 
  
}

public get currentUser():User{
  return this.userSubject.value; //latest user
}

login(userLogin:IUserLogin):Observable<User>{
  return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
    tap({
      next : (user) => {
        this.setUserToLocalStorage (user);
        this.userSubject.next(user); //when we get the user from the backend we will set it to the userSubject
        this.toastrService.success(
          `Welcome to Foodmine ${user.name}`,
          'Login Successful'
        )
      },
      error: (errResponse) => {
        this.toastrService.error(
          errResponse.error.message,
          'Login Failed'
        )
    }
  }
  )

  )

} //I which means Interface where we can't create an instance from it 


register(userRegister:IUserRegister):Observable<User>{
  return this.http.post<User>(USERS_REGISTER_URL,userRegister).pipe(
    tap({
      next: (user) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(
          `Welcome to Foodmine ${user.name}`,
          'Register Successful'
          
        )
      },
      error: (errResponse) => {
        this.toastrService.error(
          errResponse.error.message,
          'Register Failed'
        )
    }
    })
  )


}

logout(){
  this.userSubject.next(new User());
  localStorage.removeItem(USER_KEY);
  window.location.reload();
}






private setUserToLocalStorage (user:User){
  localStorage.setItem(USER_KEY,JSON.stringify(user));
}

private getUserFromLocalStorage():User{
  const userJson = localStorage.getItem(USER_KEY);
  if(userJson) return JSON.parse(userJson) as User
  return new User();
}
}
