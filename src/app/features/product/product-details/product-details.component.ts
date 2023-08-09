import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, CounterComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product>;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product$ = this.activeRoute.paramMap.pipe(
      switchMap((params) => {
        const productId = params.get('productId');
        return this.productService.getProductById(Number(productId));
      })
    );
  }
}
