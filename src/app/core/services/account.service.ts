import { Injectable } from '@angular/core';
import { Establishment } from '../interface/Establishment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { Router } from '@angular/router';
import { EstablishmentSettings } from '../interface/EstablishmentSettings';
import { Api } from '../class/api';
import { LocalStorageService } from './local-storage.service';
import { LocalStorage } from '../class/local-storage';

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
}
