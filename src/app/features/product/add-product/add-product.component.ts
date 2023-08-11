import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductForm } from 'src/app/models/product-form.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  @ViewChild('productSubmitForm', { read: NgForm })
  productFormTemplate!: NgForm;

  product$!: Observable<Product>;
  productForm: ProductForm = {
    id: null,
    title: '',
    description: '',
    price: 0,
    image: null,
  };
  previewImgUrl: any;

  constructor(private productService: ProductService) {}

  addProduct() {
    this.productService.addProduct(this.productForm).subscribe(console.log);
  }

  handleFiles({ target: { files } }: any) {
    this.productForm.image = files[0];
    this.previewImage(files[0]);
  }

  emptyFile() {
    this.previewImgUrl = null;
  }

  private previewImage(file: File) {
    const fileReader = new FileReader();

    fileReader.onload = ({ target }) => {
      this.previewImgUrl = target?.result;
    };

    fileReader.readAsDataURL(file);
  }
}
