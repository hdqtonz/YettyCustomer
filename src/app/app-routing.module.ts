import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { LandingComponent } from './modules/landing/landing.component';
import { PageGuard } from './core/guards/page.guard';

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
        path: 'landing/:eId',
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
        canActivate: [PageGuard],
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./modules/order/order.module').then((m) => m.OrderModule),
        canActivate: [PageGuard],
      },
      {
        path: 'terms-and-conditions',
        loadChildren: () =>
          import(
            './modules/terms-and-conditions/terms-and-conditions.module'
          ).then((m) => m.TermsAndConditionsModule),
      },
      {
        path: 'faqs',
        loadChildren: () =>
          import('./modules/faqs/faqs.module').then((m) => m.FaqsModule),
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
