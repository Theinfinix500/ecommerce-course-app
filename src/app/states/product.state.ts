import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AddProductAction } from '../actions/add-product.action';

interface ProductStateModel {
  text: string;
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    text: 'initial Value',
  },
})
@Injectable()
export class ProductState {
  @Action(AddProductAction)
  sendMessage(
    { setState }: StateContext<ProductStateModel>,
    payload: AddProductAction
  ) {
    // call api service
    setState({
      text: payload.text,
    });
  }
}
