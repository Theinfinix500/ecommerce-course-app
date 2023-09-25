import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatSelectModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  router: Router = inject(Router);

  filterChanged({ value }: any) {
    console.log(value);
    this.router.navigate([], {
      queryParams: {
        category: value,
      },
      queryParamsHandling: 'merge',
    });
  }
}
