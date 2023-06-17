import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './qr-scanner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  declarations: [
    QrScannerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    NgxScannerQrcodeModule
  ]
})
export class QrScannerModule { }
