import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenService } from '../token.service';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('🚀 Intercepting Request:', req.url);
  const tokenService = inject(TokenService); 
  const token = tokenService.getToken() || '';

  const apiUrl = environment.apiBaseUrl;
  const modifiedUrl = req.url.startsWith('http')
    ? req.url
    : `${apiUrl}${req.url}`;

  const modifiedReq = req.clone({
    url: modifiedUrl,
    setHeaders: {
      Authorization: `Bearer ${token}`, // Modify as needed
    },
  });

  return next(modifiedReq); // Corrected `next` usage
};
