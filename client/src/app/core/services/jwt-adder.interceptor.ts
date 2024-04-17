import { HttpInterceptorFn } from '@angular/common/http';

export const jwtAdderInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.includes('/api/users/login') ||
    req.url.includes('/api/users/register')
  ) {
    return next(req);
  }
  // console.log('Come into JWT ADDER');
  const jwtToken = localStorage.getItem('token');
  // console.log(jwtToken);

  if (jwtToken) {
    // console.log('JWT ADDER WORKED');

    const finalToken = `Bearer ${jwtToken}`;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', finalToken),
    });
    return next(authReq);
  }
  return next(req);
};
