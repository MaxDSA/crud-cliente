import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const authReq = user.token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } })
    : req;

  return next(authReq);
};
