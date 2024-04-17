import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp !== undefined) {
        if (decodedToken.exp < currentTime) {
          // Token has expired
          console.log('Token expired');
          router.navigateByUrl('login');
          return false;
        } else {
          return true;
        }
      } else {
        console.log('exp is undefined');
        return false;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      router.navigateByUrl('login');
      return false;
    }
  } else {
    // Token is not present
    console.log('Token is not present');

    router.navigateByUrl('login');
    return false;
  }
};
