import { ViewEncapsulation } from '@angular/compiler';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
  ScannerQRCodeDevice,
} from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';
import { LocalStorage } from 'src/app/core/class/local-storage';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements AfterViewInit {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private _localStorageService: LocalStorageService
  ) {}

  ngAfterViewInit(): void {
    this.action.isReady.pipe(delay(1000)).subscribe(() => {
      this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e?.length && action && action.stop();

    let data = e.map((x) => x.value).toString();

    let tableId = data.split('=')[1];
    let establishmentId = data.substring(
      data.lastIndexOf('/') + 1,
      data.indexOf('?')
    );

    console.log(e, 'data.e');
    this._localStorageService.setItem(LocalStorage.TABLE_ID, tableId);

    this._localStorageService.setItem(
      LocalStorage.ESTABLISHMENT_ID,
      establishmentId
    );
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }
}
