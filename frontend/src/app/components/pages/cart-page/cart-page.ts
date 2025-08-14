import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart';
import { CartItem } from '../../../shared/models/CartItem';
import { Title } from '../../partials/title/title';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFound } from "../../partials/not-found/not-found";
import { FoodPage } from "../food-page/food-page";

@Component({
  selector: 'app-cart-page',
  imports: [Title, CommonModule, RouterModule, NotFound, FoodPage],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {}

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }
  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
