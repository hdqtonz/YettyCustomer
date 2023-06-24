import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './qr-scanner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [QrScannerComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    NgxScannerQrcodeModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class QrScannerModule {}
