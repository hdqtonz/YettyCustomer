import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import englishTranslations from '../../../assets/i18n/en.json';
import { LocalStorage } from '../class/local-storage';
import { Languages } from '../enum/languages';


const LOCALE = 'defaultLanguage';

// export enum Locale {
//   English = 'en',
// }

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private locale$ = new BehaviorSubject<Languages>(Languages.English);
  locale: Observable<Languages> = this.locale$.asObservable();

  constructor(private translateService: TranslateService) {}

  setDefaults() {
    this.translateService.setTranslation(Languages.English, englishTranslations);
    this.translateService.setDefaultLang(Languages.English);
  }

  setLang(locale: Languages) {
    this.translateService.setDefaultLang(locale);
    localStorage.setItem(LOCALE, locale);
    this.locale$.next(locale);
  }

  async setFromStorage() {
    const locale: Languages = localStorage.getItem(LOCALE) as Languages;
    if (locale) {
      this.translateService.setDefaultLang(locale);
      this.locale$.next(locale);
    }
  }

  setBaseCurrency(BaseCurrency: string) {
    localStorage.setItem(LocalStorage.BaseCurrency, BaseCurrency || 'EUR');
  }
}
