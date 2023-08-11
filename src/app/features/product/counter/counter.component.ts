import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true,
    },
  ],
})
export class CounterComponent implements ControlValueAccessor {
  disabled: any;
  value: any;
  touched!: Function;
  changeValue!: Function;
  count!: number;

  reduceQty() {
    console.log('reduceQty');
    if (this.count === 1) {
      return;
    }

    this.count = this.count - 1;
    this.changeValue(this.count);
  }

  addQty() {
    console.log('addQty');
    this.count = this.count + 1;
    this.changeValue(this.count);
  }

  writeValue(value: any): void {
    this.value = value;
    this.count = value;
    console.log(value);
  }

  registerOnChange(fn: any): void {
    this.changeValue = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
