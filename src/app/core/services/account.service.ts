import { Injectable } from '@angular/core';
import { Establishment } from '../interface/Establishment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { Router } from '@angular/router';
import { EstablishmentSettings } from '../interface/EstablishmentSettings';
import { Api } from '../class/api';
import { LocalStorageService } from './local-storage.service';
import { LocalStorage } from '../class/local-storage';
import { tableAPIEndpoints } from '../class/endpoints/tables';
import { AppRoute } from '../class/app-route';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  // Establishment Info Subject
  public currentEstablishmentInfoSubject!: BehaviorSubject<Establishment>;
  public currentEstablishmentInfo!: Observable<Establishment>;

  // Establishment setting Info
  public establishmentSettingSubject!: BehaviorSubject<EstablishmentSettings>;
  public establishmentSetting!: Observable<EstablishmentSettings>;

  // VISITOR ID Subject
  public visitorIdInfoSubject!: BehaviorSubject<string>;
  public visotorIdInfo!: Observable<string>;

  constructor(
    private _router: Router,
    private _http: HttpClientService,
    private _localStorageService: LocalStorageService
  ) {
    // CurrentEstablishment Info Subject
    let establishmentInfo: any = this._localStorageService.getItem(
      LocalStorage.EstablishmentInfo
    );

    this.currentEstablishmentInfoSubject = new BehaviorSubject<Establishment>(
      JSON.parse(establishmentInfo)
    );

    this.currentEstablishmentInfo =
      this.currentEstablishmentInfoSubject.asObservable();

    // Establishment setting Info Subject

    let establishmentSetting: any = this._localStorageService.getItem(
      LocalStorage.EstablishmentSetting
    );

    this.establishmentSettingSubject =
      new BehaviorSubject<EstablishmentSettings>(
        JSON.parse(establishmentSetting)
      );

    this.establishmentSetting = this.establishmentSettingSubject.asObservable();

    // Vistor Subject

    let visitorId: string = this._localStorageService.getItem(
      LocalStorage.VISITOR_ID
    );

    this.visitorIdInfoSubject = new BehaviorSubject<string>(visitorId);
    this.visotorIdInfo = this.visitorIdInfoSubject.asObservable();
  }

  public get establishmentInfo() {
    return this.currentEstablishmentInfoSubject.value;
  }

  getEstablishmentSetting() {
    return this._http
      .get<EstablishmentSettings>(`${Api._getEstablishmentsSetting}`)
      .pipe(
        map((setting: EstablishmentSettings) => {
          // Set subject Establishment Settings
          this.establishmentSettingSubject.next(setting);

          this._localStorageService.setItem(
            LocalStorage.EstablishmentSetting,
            JSON.stringify(setting)
          );

          this._localStorageService.setItem(
            LocalStorage.DefaultLanguage,
            setting.defaultLanguage
          );

          this._localStorageService.setItem(
            LocalStorage.BaseCurrency,
            setting.baseCurrency
          );

          this._localStorageService.setItem(
            LocalStorage.RestrictAccessByLocation,
            JSON.stringify(setting.restrictAccessByLocation)
          );

          return setting;
        })
      );
  }

  getEstblishmentsGeneralInfo() {
    return this._http
      .get<Establishment>(`${Api._getEstablishmentsGeneralInfo}`)
      .pipe(
        map((generalInfo: Establishment) => {
          // Set subject for General info
          this.currentEstablishmentInfoSubject.next(generalInfo);

          // Set Estblishment General info into Local Storage;
          this._localStorageService.setItem(
            LocalStorage.EstablishmentInfo,
            JSON.stringify(generalInfo)
          );
          return generalInfo;
        })
      );
  }

  removeVisitorFromTable() {
    return this._http
      .delete<any>(`${tableAPIEndpoints._removeVisitorFromTable}`)
      .pipe(
        map((response) => {
          // Remove Subject Value and other local value
          this.currentEstablishmentInfoSubject.next(null);
          this.visitorIdInfoSubject.next(null);
          this._localStorageService.removeKey(
            LocalStorage.EstablishmentSetting
          );
          this._localStorageService.removeKey(LocalStorage.TABLE_ID);
          this._localStorageService.removeKey(LocalStorage.VISITOR_ID);
          this.navigateTo(AppRoute.Landing);

          return response;
        })
      );
  }

  /**
   * To navigate other pages
   * @param path
   */
  navigateTo(path: string) {
    this._router
      .navigate([path])
      .then((res) => {
        if (res) {
          this.scrollToTop();
          localStorage.clear();
        }
      })
      .catch((err) => {
        console.log(`Somting went wrong`);
      });
  }

  /**
   * To Scroll at Top
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
