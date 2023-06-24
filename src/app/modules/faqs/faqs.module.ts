import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './faqs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FaqsComponent,
  },
];

@NgModule({
  declarations: [FaqsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FaqsModule {}
