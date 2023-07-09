import { Injectable } from '@angular/core';
import { CustomHttpParams } from '../class/customParams';
import { orderTransferRequestAPIEndpoints } from '../class/endpoints/orderTransferRequests';
import { Check } from '../interface/Check';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor(private _http: HttpClientService) { }

  getTableCheck(isAllVisitor: boolean) {
    return this._http.get<Check>(`${orderTransferRequestAPIEndpoints._getTableCheck}?allVisitors=${isAllVisitor}`, {
      params: new CustomHttpParams(true),
    });
  }
}
