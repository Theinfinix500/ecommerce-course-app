import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'];

  const router = inject(Router);
  const auth = inject(AuthService);
  const userRole = auth.connectedUserRole();
  if (roles.includes(userRole)) {
    return true;
  }

  router.navigateByUrl('/home');
  return false;
};
