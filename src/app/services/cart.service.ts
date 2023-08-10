import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: BehaviorSubject<Product[]> = new BehaviorSubject(
    (JSON.parse(localStorage.getItem('cart') as string) as Product[]) || []
  );
  cartItems$ = this.cartItems.asObservable();

  addItemToCart(item: Product) {
    this.cartItems.next([item, ...this.cartItems.value]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems.next([]);
  }

  removeItemFromCart(productId: number) {
    const cartItems = this.cartItems.value.filter(
      (product) => product.id !== productId
    );
    this.cartItems.next(cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
}
