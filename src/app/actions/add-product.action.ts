export class AddProductAction {
  static readonly type = '[Product] Add Product';

  constructor(public text: string) {}
}
