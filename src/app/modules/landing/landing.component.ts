import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoute } from 'src/app/core/class/app-route';
import { BaseComponent } from 'src/app/core/class/base-component';
import { LocalStorage } from 'src/app/core/class/local-storage';
import { QrScannerComponent } from 'src/app/core/components/dialog-boxes/qr-scanner/qr-scanner.component';
import { Establishment } from 'src/app/core/interface/Establishment';
import { EstablishmentSettings } from 'src/app/core/interface/EstablishmentSettings';
import { EstablishmentsSettingDTO } from 'src/app/core/interface/establishment-setting';
import { AccountService } from 'src/app/core/services/account.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent extends BaseComponent implements OnInit {
  public establishmentsSetting!: EstablishmentsSettingDTO;
  public establishmentId!: string;
  public tableId!: string;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _accountService: AccountService,
    private _localStorageService: LocalStorageService,
    public _dialog: MatDialog,
    private _route: ActivatedRoute
  ) {
    super(_matSnackBar);

    this._route.params.subscribe((params: any) => {
      this.establishmentId = params.eId;
    });

    this._route.queryParamMap.subscribe((queryParams) => {
      this.tableId = queryParams.get('table') || '';
    });
  }

  ngOnInit(): void {
    this.initialization();
  }

  /**
   * initialization function
   */
  initialization() {
    if (this.establishmentId?.length && this.tableId?.length) {
      this._localStorageService.setItem(
        LocalStorage.ESTABLISHMENT_ID,
        this.establishmentId
      );
      this._localStorageService.setItem(LocalStorage.TABLE_ID, this.tableId);

      this.getEstblishmmentsSetting();
    }
  }

  /**
   * Opne Qr scanner
   */
  onOfQrScanner() {
    const dialogRef = this._dialog.open(QrScannerComponent, {
      height: '80%',
      width: '75%',
    });

    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        let data = res?.data;
        if (data) {
          this.establishmentId = data.establishmentId;
          this.tableId = data.tableId;
          this.initialization();
        }
      },
    });
  }

  /**
   * Get Estblishments Setting
   */
  getEstblishmmentsSetting() {
    this.isLoading = true;
    this._accountService.getEstablishmentSetting().subscribe({
      next: (res: EstablishmentSettings) => {
        if (Object.keys(res)?.length) {
          this.getEstblishmentsGeneralInfo();
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * Get Estblishments General Info
   */
  getEstblishmentsGeneralInfo() {
    this.isLoading = true;
    this._accountService.getEstblishmentsGeneralInfo().subscribe({
      next: (res: Establishment) => {
        if (Object.keys(res)?.length) {
          this.showMessage(`Welcome to Yetty`);
          this.navigateTo(`${AppRoute.Home}`);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
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
