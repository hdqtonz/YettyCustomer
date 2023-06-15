import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManuComponent } from './manu.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { CheckComponent } from './check/check.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ManuComponent,
    children: [
      {
        path: '',
        redirectTo: 'menu-items',
        pathMatch: 'full',
      },
      {
        path: 'menu-items',
        component: MenuItemsComponent,
      },
      {
        path: 'check',
        component: CheckComponent,
      },
      {
        path: 'detail',
        component: MenuDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
