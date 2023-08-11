import { CartService } from './../../services/cart.service';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ProductState } from './store/product.state';
import { FetchProducts } from './store/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public productsService: ProductService;
  @Select(ProductState.products) products$!: Observable<Product[]>;
  sqliInput = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store
  ) {
    this.productsService = inject(ProductService);
  }

  ngOnInit(): void {
    this.store.dispatch(FetchProducts);
  }

  navigateTo(productId: number) {
    this.router.navigateByUrl(`/products/details/${productId}`);
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.cartService.addItemToCart(product);
  }
}
