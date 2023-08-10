import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HasRoleDirective } from 'src/app/directives/has-role.directive';
import { SqliInputComponent } from 'src/app/components/sqli-input/sqli-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductCardComponent,
    MatButtonModule,
    MatIconModule,
    HasRoleDirective,
    SqliInputComponent,
    FormsModule,
  ],
})
export class ProductModule {}
