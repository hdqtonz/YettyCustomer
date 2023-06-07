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
		 let URL = url.replace('{establishmentId}', localStorage.getItem('establishmentId'))
		return `${environment.ApiBaseUrl.toString()}/${URL}`;
	}
}
