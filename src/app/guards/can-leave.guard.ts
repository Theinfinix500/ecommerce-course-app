import { CanDeactivateFn } from '@angular/router';
import { AddProductComponent } from '../features/product/add-product/add-product.component';

export const canLeaveGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const isFormDirty = (component as AddProductComponent).productFormTemplate
    .dirty;

  if (isFormDirty) {
    const confirmation = confirm(
      'Are you sure you want to leave? your data will be lost!'
    );
    return confirmation;
  }

  return true;
};
