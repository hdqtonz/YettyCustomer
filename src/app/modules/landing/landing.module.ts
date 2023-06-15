import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingComponent } from './landing.component';
import { QrScannerModule } from 'src/app/core/components/dialog-boxes/qr-scanner/qr-scanner.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, LandingRoutingModule, SharedModule, QrScannerModule],
})
export class LandingModule {}
