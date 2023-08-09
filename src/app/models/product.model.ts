import { Category } from "./category.model";
import { Image } from "./image.model";

export interface Product {
  id: number;
  title: string;
  description: string;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
  categories: Category[];
}



