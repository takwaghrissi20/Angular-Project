import { Component ,OnInit } from '@angular/core';
import { CartService } from '../../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user';
import { User } from '../../../shared/models/User';
@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule , RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header implements OnInit {
  cartQuantity=0;
  user!:User;
  constructor(cartService:CartService ,private userService:UserService) {
    cartService.getCartObservable().subscribe(newCart=> {
      this.cartQuantity = newCart.totalCount;
  })

  userService.userObservable.subscribe((newUser) => {
    this.user = newUser;
  })
  }
  ngOnInit(): void {
    // Initialization logic can go here
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return !!this.user?.token;
  }
}
