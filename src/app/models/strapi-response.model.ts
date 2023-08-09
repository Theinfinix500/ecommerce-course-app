import { Meta } from '@angular/platform-browser';

export interface StrapiResponse<T> {
  data: T;
  meta: Meta;
}
