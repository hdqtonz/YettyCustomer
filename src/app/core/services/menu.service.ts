import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Api } from '../class/api';
import { MenuSections } from '../interface/MenuSections';
import { MenuSectionFullInfo } from '../interface/MenuSectionFullInfo';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private _http: HttpClientService) {}

  getEstablishmentMenuSections() {
    return this._http.get<MenuSections>(`${Api._getEstablishmentMenuSections}`);
  }
}
