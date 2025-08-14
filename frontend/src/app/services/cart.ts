import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;
  private cartSubject: BehaviorSubject<Cart>;

  constructor() {
    this.cart = this.getCartFromLocalStorage();
    this.cartSubject = new BehaviorSubject<Cart>(this.cart);
  }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem) return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = cartItem.food.price * quantity;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price, 0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity, 0
    );

    if (this.isBrowser()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    if (this.isBrowser()) {
      const cartJson = localStorage.getItem('cart');
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
    return new Cart();
  }
}
