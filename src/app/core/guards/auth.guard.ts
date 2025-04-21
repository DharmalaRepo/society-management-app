import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user) return true;

  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
