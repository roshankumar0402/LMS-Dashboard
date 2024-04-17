import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const logcheckGuard: CanActivateFn = (route, state) => {
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
          // router.navigateByUrl('login');
          return true;
        } else {
          router.navigateByUrl('home');
          return false;
        }
      } else {
        console.log('exp is undefined');
        return true;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // router.navigateByUrl('login');
      return true;
    }
  } else {
    // Token is not present
    console.log('Token is not present');

    // router.navigateByUrl('login');
    return true;
  }
};
