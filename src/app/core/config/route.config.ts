import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class RouteConfig {
  /**
   * Get absolute API url
   * @param {string} url API Url
   * @returns
   */
  Url(url: any): string {
    // Set Extablishment Id in to the API Url from Local Storage
    let URL = url.replace(
      '{establishmentId}',
      localStorage.getItem('establishmentId')
    );

    // Set Table Id in to the API Url from Local Storage
    URL = URL.replace('{tableId}', localStorage.getItem('tableId'));

    // Set visitor Id in to the API Url from Local Storage
    URL = URL.replace('{visitorId}', localStorage.getItem('visitorId'));

    return `${environment.ApiBaseUrl.toString()}/${URL}`;
  }
}
