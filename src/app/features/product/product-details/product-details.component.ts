import { CartService } from './../../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { tap, switchMap, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CounterComponent } from '../counter/counter.component';
import { HasRoleDirective } from 'src/app/directives/has-role.directive';
import { ProductForm } from '@models/product-form.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CounterComponent,
    RouterModule,
    HasRoleDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product>;
  productQtyControl!: FormControl;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productQtyControl = this.fb.control(1);

    this.product$ = this.activeRoute.paramMap.pipe(
      switchMap((params) => {
        const productId = params.get('productId');
        return this.productService.getProductById(Number(productId));
      })
    );
  }

  addToCart(product: Product) {
    this.cartService.addItemToCart({
      ...product,
      qty: this.productQtyControl.value,
    });
  }
}
