import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product.model';
import { map } from 'rxjs';
import { StrapiResponse } from '../models/strapi-response.model';
import { API_URL } from '../app.module';
import { ProductForm } from '../models/product-form.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_URL = 'http://localhost:1337';

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getProducts() {
    return this.http
      .get<StrapiResponse<Product[]>>(`${this.apiUrl}/products?populate=*`)
      .pipe(
        map(({ data }) =>
          data.map((product) => ({
            ...product,
            image: product.image
              ? {
                  ...product.image,
                  url: `${this.API_URL}${product.image.url}`,
                }
              : null,
          }))
        )
      );
  }

  getProductById(productId: number) {
    return this.http
      .get<StrapiResponse<Product>>(
        `${this.apiUrl}/products/${productId}?populate=*`
      )
      .pipe(
        map(({ data: product }) => ({
          ...product,
          image: product.image
            ? {
                ...product.image,
                url: `${this.API_URL}${product?.image.url}`,
              }
            : null,
        }))
      );
  }

  addProduct({ image, ...product }: ProductForm) {
    const formData = new FormData();
    formData.append('files.image', image as File, image?.name);

    formData.append('data', JSON.stringify(product));

    return this.http.post(`${this.apiUrl}/products`, formData);
  }

  editProduct({ id: productId, ...product }: ProductForm) {
    return this.http.put(`${this.apiUrl}/products/${productId}`, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }
}
