import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  if (auth.isLoggedInValue()) {
    return true;
  }

  router.navigateByUrl('/home');
  return false;
};
