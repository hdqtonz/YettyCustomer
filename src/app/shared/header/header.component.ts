import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/class/base-component';
import { LocalStorage } from 'src/app/core/class/local-storage';
import { Establishment } from 'src/app/core/interface/Establishment';
import { ServiceRequested } from 'src/app/core/interface/ServiceRequested';
import { AccountService } from 'src/app/core/services/account.service';
import { CommonService } from 'src/app/core/services/common.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { Languages } from 'src/app/core/enum/languages';
import { AppRoute } from '../../core/class/app-route';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  languages = Languages;

  public establishmentInfo!: Establishment;
  public visitorId: string;

  public selectedType!: string;

  public baseCurrency!: string;
  public defaultLanguage!: string;

  public serviceRequested!: ServiceRequested;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _localizationService: LocalizationService,
    private _accountService: AccountService,
    private _localStorageService: LocalStorageService,
    private _commonService: CommonService,
    private _cdr: ChangeDetectorRef
  ) {
    super(_matSnackBar);
  }

  ngOnInit(): void {
    this._accountService.currentEstablishmentInfo.subscribe((details) => {
      // this.isEstablishmentInfo = true;
      this.establishmentInfo = details;
      this._cdr.detectChanges();
    });

    // To Show Some button into header
    this._accountService.visotorIdInfo.subscribe((visitorId) => {
      this.visitorId = visitorId;
      this._cdr.detectChanges();
    });

    // Get Base Currency
    this.baseCurrency = this._localStorageService.getItem(
      LocalStorage.BaseCurrency
    );

    // Get Language
    this.defaultLanguage = this._localStorageService.getItem(
      LocalStorage.DefaultLanguage
    );
  }

  onLanguageChange(event: any) {
    let lang = event.target.value;
    this._localizationService.setLang(lang);
    this.showMessage(`Your Currency is Changed`);
  }

  onBaseCurrencyChange(event: any) {
    let currency = event.target.value;
    this._localizationService.setBaseCurrency(currency);
    this.showMessage(`Your Currency is Changed to ${currency}`);
  }

  getServiceRequestedStatus() {
    this.isLoading = true;
    this._commonService.getServiceRequestedStatus().subscribe({
      next: (response) => {
        this.serviceRequested = response;
        this._cdr.detectChanges();
        this.isLoading = false;
      },
      error: (err) => {
        this.showError(err.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  requestServiceOnTable() {
    this._commonService.requestServiceOnTable().subscribe({
      next: (response) => {
        this.showMessage('Successfully Requested Service On you Table');
        this.getServiceRequestedStatus();
        this.isLoading = false;
      },
      error: (err) => {
        this.showError(err.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  cancelServiceRequestOnTable() {
    this._commonService.cancelServiceRequestOnTable().subscribe({
      next: (response) => {
        this.showMessage('Successfully canceled Service On you Table');
        this.getServiceRequestedStatus();
        this.isLoading = false;
      },
      error: (err) => {
        this.showError(err.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  removeVisitor() {
    this._accountService.removeVisitorFromTable().subscribe({
      next: (response) => {
        this.showMessage('Visitor removed successfully');
      },
      error: (err) => {
        console.log(err, 'message');
        this.showError(err?.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
