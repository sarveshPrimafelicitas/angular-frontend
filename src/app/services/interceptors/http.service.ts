import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('🚀 Intercepting Request:', req.url);

  const apiUrl = environment.apiBaseUrl;
  const modifiedUrl = req.url.startsWith('http') ? req.url : `${apiUrl}${req.url}`;

  const modifiedReq = req.clone({
    url: modifiedUrl,
    setHeaders: {
      Authorization: `Bearer YOUR_TOKEN_HERE`, // Modify as needed
    },
  });

  return next(modifiedReq); // Corrected `next` usage
};
