import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { FooterOnlyLayoutComponent } from './core/layouts/footer-only-layout/footer-only-layout.component';
import { SharedModule } from './shared/shared.module';
import { AppLocalizationInitializationFactory } from './core/initialization/localization/app-localization-initialization.factory';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppLocalizationInitializationService } from './core/initialization/localization/app-localization-initialization.service';
import { AbstractInitializationFactory } from './core/initialization/abstract-initialization.factory';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    FooterOnlyLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: AppLocalizationInitializationFactory.createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AbstractInitializationFactory.getInitializationFunction,
      deps: [AppLocalizationInitializationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
