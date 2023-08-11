import { ProductService } from 'src/app/services/product.service';
import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FetchProducts } from './product.actions';
import { tap } from 'rxjs';

interface ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}

  @Selector()
  static products(state: ProductStateModel) {
    return state.products;
  }

  @Action(FetchProducts)
  fetchProducts({ setState }: StateContext<ProductStateModel>) {
    return this.productService.getProducts().pipe(
      tap((products) => {
        setState({ products });
      })
    );
  }
}
