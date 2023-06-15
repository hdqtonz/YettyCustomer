import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Api } from '../class/api';
import { Establishment } from '../interface/Establishment';
import { EstablishmentSettings } from '../interface/EstablishmentSettings';
import { EstablishmentTable } from '../interface/Table';
import { AddVisitorResponse } from '../interface/AddVisitorResponse';
import { AddVisitorRequest } from 'src/app/modules/home/home';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  constructor(private _http: HttpClientService) {}

  // /** Home service start */
  // getEstablishmentsData() {
  //   return this._http.get<EstablishmentSettings>(
  //     `${Api._getEstablishmentsSetting}`
  //   );
  // }

  // getEstblishmentsGeneralInfo() {
  //   return this._http.get<Establishment>(
  //     `${Api._getEstablishmentsGeneralInfo}`
  //   );
  // }

  getEstablishmentsTableInfo(tableId: string) {
    return this._http.get<EstablishmentTable>(
      `${Api._getEstablishmentsTableInfo}/${tableId}`
    );
  }

  addVisitorToTable(tableId: string, reqBody: AddVisitorRequest) {
    return this._http.post<AddVisitorResponse>(
      `${Api._addVisitorToTable}/${tableId}/visitors`,
      reqBody
    );
  }

  /** Home service End */
}
