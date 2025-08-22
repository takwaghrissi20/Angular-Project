import { Component, OnInit } from '@angular/core';
import { Title } from "../../partials/title/title";
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user';
import { ActivatedRoute, Router ,RouterModule } from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { InputText } from "../../partials/input-text/input-text";
import { DefaultButton } from "../../partials/default-button/default-button";

@Component({
  selector: 'app-register-page',
  imports: [Title, InputText, DefaultButton,ReactiveFormsModule,RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage implements OnInit  {


  registerForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required , Validators.minLength(5)]],
      email:['',[Validators.required , Validators.email]],
      password:['',[Validators.required , Validators.minLength(5)]],
      confirmPassword:['',[Validators.required ]],
      address:['',[Validators.required , Validators.minLength(10)]],
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    }
  
  )
     
  this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }


  get fc (){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user:IUserRegister={
      name: fv.name,
      email:fv.email,
      password:fv.password,
      confirmPassword:fv.confirmPassword,
      address:fv.address,
    }

    this.userService.register(user).subscribe (_ => {
      
      this.router.navigateByUrl(this.returnUrl);
    }
    )
  }
}
