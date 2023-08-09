import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Meta } from '../models/meta.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_URL = 'http://localhost:1337';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<{ data: Product[]; meta: Meta }>(
        'http://localhost:1337/api/products?populate=*'
      )
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
}
