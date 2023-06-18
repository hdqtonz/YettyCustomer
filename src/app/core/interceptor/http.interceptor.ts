import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpParams } from '../class/customParams';
import { LocalStorage } from '../class/local-storage';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.params instanceof CustomHttpParams && request.params.param1) {
      const reqCopy = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('x-api-key', environment.ApiKey),

        params: (request.params ? request.params : new HttpParams())
          .set('lang', localStorage.getItem('locale') || 'en')
          .set(
            'currency',
            localStorage.getItem(LocalStorage.BaseCurrency) || 'EUR'
          ),
      });

      return next.handle(reqCopy);
    } else {
      const reqCopy = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('x-api-key', environment.ApiKey),

        params: (request.params ? request.params : new HttpParams()).set(
          'lang',
          localStorage.getItem('locale') || 'en'
        ),
      });

      return next.handle(reqCopy);
    }
  }
}
