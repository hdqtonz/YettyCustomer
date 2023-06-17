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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppLocalizationInitializationService } from './core/initialization/localization/app-localization-initialization.service';
import { AbstractInitializationFactory } from './core/initialization/abstract-initialization.factory';
import { FormsModule } from '@angular/forms';
import { HttpInterceptors } from './core/interceptor/http.interceptor';
import { HttpClientService } from './core/services/http-client.service';
import { RouteConfig } from './core/config/route.config';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, FooterOnlyLayoutComponent],
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
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    NgxScannerQrcodeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptors,
      multi: true,
    },
    HttpClientService,
    RouteConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: AbstractInitializationFactory.getInitializationFunction,
      deps: [AppLocalizationInitializationService],
      multi: true,
    },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
