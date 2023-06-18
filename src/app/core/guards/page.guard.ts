import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorage } from '../class/local-storage';
import { AppRoute } from '../class/app-route';

@Injectable({
  providedIn: 'root',
})
export class PageGuard implements CanActivate {
  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let visitorId = this._localStorageService.getItem(LocalStorage.VISITOR_ID);
    let tableId = this._localStorageService.getItem(LocalStorage.TABLE_ID);

    if (!visitorId?.length || !tableId?.length) {
      // go to Home if not table id or visitor id
      this._router.navigate([AppRoute.Home]);
      return false;
    }

    return true;
  }
}
