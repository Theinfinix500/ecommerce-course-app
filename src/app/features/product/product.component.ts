import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public productsService: ProductService;
  products$!: Observable<Product[]>;

  constructor(private router: Router) {
    this.productsService = inject(ProductService);
  }

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  navigateTo(productId: number) {
    this.router.navigateByUrl(`/products/details/${productId}`);
  }
}
