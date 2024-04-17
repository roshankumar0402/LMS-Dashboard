import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let isLogged = localStorage.getItem('isLogged');
  if (isLogged != null) {
    const converted = JSON.parse(isLogged);

    if (converted == false) {
      alert('Please login, redirecting to login page');
      router.navigateByUrl('login');
      return false;
    }
  }
  if (isLogged == null) {
    alert('Please login, redirecting to login page');
    router.navigateByUrl('login');
    return false;
  }
  return true;
};
