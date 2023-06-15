import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteConfig } from '../config/route.config';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient, private routeConfig: RouteConfig) {}

  /**
   * Make http GET request
   * @param url
   */
  get<T>(url: string, headers?: any) {
    return this.http.get<T>(this.routeConfig.Url(url));
  }

  /**
   * Make http POST request
   * @param url
   * @param data
   */
  post<T>(url: string, data?: any, headers?: any) {
    let body = JSON.stringify(data);
    return this.http.post<any>(this.routeConfig.Url(url), body);
  }

  /**
   * Make http PUT with
   * @param url
   * @param data
   */
  put<T>(url: string, data?: any) {
    let body = JSON.stringify(data);
    return this.http.put<any>(this.routeConfig.Url(url), body);
  }

  /**
   * Make http PUT with
   * @param url
   * @param data
   */
  delete<T>(url: string) {
    return this.http.delete<any>(this.routeConfig.Url(url));
  }
}
