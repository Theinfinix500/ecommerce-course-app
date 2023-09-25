export class FetchProducts {
  static readonly type = '[Products] Fetch Products';
  constructor(public category: string) {}
}
