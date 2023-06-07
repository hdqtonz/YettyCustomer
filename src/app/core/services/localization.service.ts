import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import englishTranslations from '../../../assets/i18n/en.json';

const LOCALE = 'defaultLanguage';

export enum Locale {
  'EN' = 'en',
}

@Injectable({
  providedIn: 'root'
})

export class LocalizationService {
  private locale$ = new BehaviorSubject<Locale>(Locale.EN);
  locale: Observable<Locale> = this.locale$.asObservable();
  
  constructor(private translateService: TranslateService) {}

  setDefaults() {
    this.translateService.setTranslation(Locale.EN, englishTranslations);
    this.translateService.setDefaultLang(Locale.EN);
  }

  setLang(locale: Locale) {
    this.translateService.setDefaultLang(locale);
    localStorage.setItem(LOCALE, locale);
    this.locale$.next(locale);
  }

  async setFromStorage() {
    const locale: Locale = localStorage.getItem(LOCALE) as Locale;
    if (locale) {
      this.translateService.setDefaultLang(locale);
      this.locale$.next(locale);
    }
  }
}
