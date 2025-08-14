import { Component ,OnInit } from '@angular/core';
import { CartService } from '../../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule , RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header implements OnInit {
  cartQuantity=0;
  constructor(cartService:CartService) {
    cartService.getCartObservable().subscribe(newCart=> {
      this.cartQuantity = newCart.totalCount;
  })
  }
  ngOnInit(): void {
    // Initialization logic can go here
  }

}
