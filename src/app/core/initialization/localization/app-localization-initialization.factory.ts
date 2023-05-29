import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class AppLocalizationInitializationFactory {
  static createTranslateLoader(httpClient: HttpClient): TranslateHttpLoader {
    const relativePathToLocaleFolder: string = '../../../../assets/i18n/';
    return new TranslateHttpLoader(httpClient, relativePathToLocaleFolder);
  }
}
