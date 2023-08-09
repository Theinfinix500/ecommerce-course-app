import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductForm } from 'src/app/models/product-form.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  product$!: Observable<Product>;
  productForm: ProductForm = {
    id: null,
    title: '',
    description: '',
    price: 0,
    image: null
  };

  constructor(private productService: ProductService) {}


  addProduct() {
    this.productService.addProduct(this.productForm).subscribe(console.log);
  }

  handleFiles({target:{files}}:any) {
    console.log(files[0]);
    this.productForm.image = files[0];
  }
}
