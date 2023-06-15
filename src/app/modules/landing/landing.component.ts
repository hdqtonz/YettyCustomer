import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/core/class/app-route';
import { BaseComponent } from 'src/app/core/class/base-component';
import { QrScannerComponent } from 'src/app/core/components/dialog-boxes/qr-scanner/qr-scanner.component';
import { Establishment } from 'src/app/core/interface/Establishment';
import { EstablishmentSettings } from 'src/app/core/interface/EstablishmentSettings';
import { EstablishmentsSettingDTO } from 'src/app/core/interface/establishment-setting';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent extends BaseComponent implements OnInit {
  public EstablishmentsSetting!: EstablishmentsSettingDTO;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _accountService: AccountService,
    public _dialog: MatDialog
  ) {
    super(_matSnackBar);
  }

  ngOnInit(): void {}

  onOfQrScanner() {
    const dialogRef = this._dialog.open(QrScannerComponent, {
      height: '80%',
      width: '75%',
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getEstblishmmentsSetting();
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
          console.log(`Successfully Navigate to ${path}`);
        }
      })
      .catch((err) => {
        console.log(`Somting went wrong`);
      });
  }
}
