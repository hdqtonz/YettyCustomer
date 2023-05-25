import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManuComponent } from './manu.component';
import { CheckComponent } from './check/check.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';



@NgModule({
  declarations: [
    ManuComponent,
    CheckComponent,
    MenuItemsComponent,
    MenuDetailComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
