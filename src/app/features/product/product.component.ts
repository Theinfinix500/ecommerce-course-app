import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ProductState } from './store/product.state';
import { FetchProducts } from './store/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Select(ProductState.products) products$!: Observable<Product[]>;
  sqliInput = '';

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.activeRouter.queryParams
      .pipe(
        switchMap((params) => {
          return this.store.dispatch(new FetchProducts(params['category']));
        })
      )
      .subscribe();
  }

  navigateTo(productId: number) {
    this.router.navigateByUrl(`/products/details/${productId}`);
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.cartService.addItemToCart(product);
  }
}
