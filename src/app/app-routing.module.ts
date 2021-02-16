import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'make-payment',
    loadChildren: () => import('./pages/card-page/card-page.module').then(m => m.CardPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./pages/success-page/success-page.module').then(m => m.SuccessPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
