import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';
import { BaseComponent } from '../class/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor extends BaseComponent implements HttpInterceptor {
  constructor(
    private _matSnackBar: MatSnackBar,
    private _accountService: AccountService
  ) {
    super(_matSnackBar);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          [401, 403].includes(err.status) &&
          this._accountService.establishmentInfo
        ) {
          // auto remove visitor from the table if 401 or 403 response returned from api
        }

        switch (err.status) {
          case 0:
            return throwError(() => new Error('API Not Runing'));

          case 400:
            this.showError(
              'Bad Request - insufficient or invalid data provided'
            );
            return throwError(() => new Error(error));

          case 500:
            this.showError('Server Is not Runing');
            return throwError(() => new Error(error));

          case 404:
            this.showError('Not found');
            break;

          default: {
            // to catch unidentified error
            this.showError('Somthing went wrong', 'X');
            console.log('non catched error', err);
          }
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  }
}
