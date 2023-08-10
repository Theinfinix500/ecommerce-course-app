import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() itemClicked: EventEmitter<any> = new EventEmitter();
  @Output() itemAdded: EventEmitter<any> = new EventEmitter();

  handleClick() {
    this.itemClicked.emit();
  }

  addToCart(event: Event) {
    this.itemAdded.emit(event);
  }
}
