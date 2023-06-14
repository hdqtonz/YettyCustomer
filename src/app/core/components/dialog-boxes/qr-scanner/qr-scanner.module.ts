import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    QrScannerComponent
  ],
  imports: [
    CommonModule,
    ZXingScannerModule,
    MatDialogModule
  ]
})
export class QrScannerModule { }
