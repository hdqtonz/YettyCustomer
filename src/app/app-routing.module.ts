import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () =>
          import('./modules/landing/landing.module').then(
            (m) => m.LandingModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./modules/menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./modules/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
