import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductForm } from 'src/app/models/product-form.model';
import { FormsModule } from '@angular/forms';
import { HasRoleDirective } from 'src/app/directives/has-role.directive';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    HasRoleDirective,
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  product$!: Observable<Product>;
  productForm: ProductForm = {
    id: null,
    title: '',
    description: '',
    price: 0,
  };

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product$ = this.activeRoute.paramMap.pipe(
      switchMap((params) => {
        const productId = params.get('productId');
        return this.productService.getProductById(Number(productId));
      }),
      tap(({ title, id, description, price }) => {
        this.productForm = { title, id, description, price };
      })
    );
  }

  editProduct() {
    this.productService.editProduct(this.productForm).subscribe(console.log);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.router.navigateByUrl('/products');
    });
  }
}
