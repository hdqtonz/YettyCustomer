import { HttpParams } from '@angular/common/http';

export class CustomHttpParams extends HttpParams {
  constructor(public param1: boolean) {
    super();
  }
}
