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

@Injectable()
export class HttpInterceptors implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqCopy = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('x-api-key', environment.ApiKey),

      params: (request.params ? request.params : new HttpParams()).set(
        'lang',
        localStorage.getItem('locale') || 'en'
      ),
    });

    console.log(reqCopy, 'reqCopy 2');

    return next.handle(reqCopy);
  }
}
