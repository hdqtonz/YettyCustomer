import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Api } from '../class/api'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http:HttpClientService) { }

  // Todo
  // getEstablishmentsData(){
  //   return this._http.get(`${Api._getEstablishmentsSettingTest}`)
  // }

}
