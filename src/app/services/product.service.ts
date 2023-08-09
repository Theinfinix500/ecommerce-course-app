import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product.model';
import { map } from 'rxjs';
import { StrapiResponse } from '../models/strapi-response.model';
import { API_URL } from '../app.module';

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
            image: {
              ...product.image,
              url: `${this.API_URL}${product.image.url}`,
            },
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
          image: {
            ...product.image,
            url: `${this.API_URL}${product.image.url}`,
          },
        }))
      );
  }
}
