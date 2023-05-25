import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'',redirectTo:'landing',pathMatch:'full'
  },

  {
    path: 'landing',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren:()=> import('./modules/landing/landing.module').then(m => m.LandingModule)  },
    ]
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren:()=> import('./modules/home/home.module').then(m => m.HomeModule)  },
    ]
  },
  {
    path: 'menu',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren:()=> import('./modules/menu/menu.module').then(m => m.MenuModule)  },
    ]
  },
  {
    path: 'order',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren:()=> import('./modules/order/order.module').then(m => m.OrderModule)  },
    ]
  },
  
  { path: '**', pathMatch: 'full', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
