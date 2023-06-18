import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private _http: HttpClientService) {
    
  }
}
