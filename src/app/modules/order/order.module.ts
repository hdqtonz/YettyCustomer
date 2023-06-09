import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderPipe } from 'src/app/core/pipe/order.pipe';

@NgModule({
  declarations: [OrderComponent, OrderPipe],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
