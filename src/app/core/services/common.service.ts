import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Api } from '../class/api';
import { tableAPIEndpoints } from '../class/endpoints/tables';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private _http: HttpClientService) {}

  getServiceRequestedStatus() {
    return this._http.get<any>(`${Api._isServiceRequestedOnTable}`);
  }

  requestServiceOnTable() {
    return this._http.post<any>(`${Api._requestServiceOnTable}`, {});
  }

  cancelServiceRequestOnTable() {
    return this._http.delete<any>(`${Api._cancelServiceRequestOnTable}`);
  }

  removeVisitorFromTable() {
    return this._http.delete<any>(`${tableAPIEndpoints._removeVisitorFromTable}`);
  }
}
