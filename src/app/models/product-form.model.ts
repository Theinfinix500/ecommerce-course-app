export interface ProductForm {
  id?: number | null;
  title: string;
  description: string;
  price: number;
  image?: File | null
}
