import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';


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
    FormsModule,
    TranslateModule,
    MatDialogModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FlexLayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    TranslateModule,
    MatDialogModule
  ]
})
export class SharedModule { }
