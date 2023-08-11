import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AddProductComponent } from './add-product/add-product.component';
import { canLeaveGuard } from 'src/app/guards/can-leave.guard';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'edit/:productId', component: ProductEditComponent },
  {
    path: 'add',
    component: AddProductComponent,
    canDeactivate: [canLeaveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
