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
          this._accountService
            .removeVisitorFromTable()
            .subscribe((response) => {});
        }

        const error: any =
          (err && err.error && err.error.errorMessage) || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  }
}
