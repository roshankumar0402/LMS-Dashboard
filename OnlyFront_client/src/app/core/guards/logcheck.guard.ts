import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logcheckGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let isLogged = localStorage.getItem('isLogged');
  if (isLogged) {
    const converted = JSON.parse(isLogged);

    if (converted == true) {
      router.navigateByUrl('home');
      return false;
    }
  }
  return true;
};
