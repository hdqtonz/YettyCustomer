import { ViewEncapsulation } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent {

  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;

  public showScanner:boolean = true 
}
