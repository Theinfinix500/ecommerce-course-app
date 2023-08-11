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

  addItemToCart(product: Product) {
    product = { ...product, qty: 1 };
    const cartItems = this.cartItems.value;
    let searchedProduct = cartItems.find((item) => item.id === product.id);

    if (searchedProduct) {
      searchedProduct = {
        ...searchedProduct,
        qty: (searchedProduct.qty as number) + 1,
      };
      this.cartItems.next([
        searchedProduct,
        ...this.cartItems.value.filter(
          (item) => item.id !== searchedProduct?.id
        ),
      ]);
    } else {
      this.cartItems.next([product, ...this.cartItems.value]);
    }
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
