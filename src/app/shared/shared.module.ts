import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FlexLayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule
  ]
})
export class SharedModule { }
