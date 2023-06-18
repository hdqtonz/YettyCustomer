import { Injectable } from '@angular/core';
import { AddVisitorRequest } from 'src/app/modules/home/home';
import { Api } from '../class/api';
import { establishmentAPIEndpoints } from '../class/endpoints/establishments';
import { AddVisitorResponse } from '../interface/AddVisitorResponse';
import { MenuSectionFullInfo } from '../interface/MenuSectionFullInfo';
import { MenuSections } from '../interface/MenuSections';
import { EstablishmentTable } from '../interface/Table';
import { HttpClientService } from './http-client.service';
import { CustomHttpParams } from '../class/customParams';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  constructor(private _http: HttpClientService) {}

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

  getEstablishmentMenuSections() {
    return this._http.get<MenuSections>(
      `${establishmentAPIEndpoints._getEstablishmentMenuSections}`
    );
  }

  getEstablishmentMenuSectionItems(menuSectionId: string) {
    return this._http.get<MenuSectionFullInfo>(
      `${establishmentAPIEndpoints._getEstablishmentMenuSectionItems}/${menuSectionId}`,
      {
        params: new CustomHttpParams(true),
      }
    );
  }

  /** Home service End */
}
