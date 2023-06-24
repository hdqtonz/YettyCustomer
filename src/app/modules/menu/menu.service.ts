import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorage } from 'src/app/core/class/local-storage';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Menu ID Subject
  public menuDeatilSubject!: BehaviorSubject<any>;
  public menuDetailInfo!: Observable<any>;

  constructor(
    private _http: HttpClientService,
    private _localStorageService: LocalStorageService
  ) {
    let menuDetail: any = this._localStorageService.getItem(
      LocalStorage.MenuDetail
    );

    // Menu Subject
    this.menuDeatilSubject = new BehaviorSubject<string>(
      JSON.parse(menuDetail)
    );

    this.menuDetailInfo = this.menuDeatilSubject.asObservable();
  }
}
