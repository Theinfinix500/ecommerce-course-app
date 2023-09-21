import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-sqli-input',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sqli-input.component.html',
  styleUrls: ['./sqli-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SqliInputComponent),
      multi: true,
    },
  ],
})
export class SqliInputComponent implements ControlValueAccessor {
  @Input() icon: string = '';
  disabled: any;
  value: any;
  touched!: Function;
  changeValue!: Function;

  writeValue(value: any): void {
    this.value = value;
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

  handleChange(value: string) {
    this.changeValue(value);
  }
}
