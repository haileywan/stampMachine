import { NgModule } from '@angular/core';
import {  PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { 
    path: 'landing', 
    loadChildren: () => import('./pages/landing/landing.module').then
    ( m => m.LandingPageModule)
  },  
  { 
    path: 'login', 
    loadChildren: () => import('./pages/auth/login/login.module').then
    ( m => m.LoginPageModule)
  },
  { path: 'register',
   loadChildren: () => import('./pages/auth/register/register.module').then
   ( m => m.RegisterPageModule)
  },
  
  { path: 'dashboard',
   loadChildren: () => import('./pages/dashboard/dashboard.module').then
   ( m => m.DashboardPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./pages/scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'current-stamp',
    loadChildren: () => import('./pages/current-stamp/current-stamp.module').then( m => m.CurrentStampPageModule)
  },
  {
    path: 'currentcus',
    loadChildren: () => import('./pages/currentcus/currentcus.module').then( m => m.CurrentcusPageModule)
  },
  {
    path: 'userinfo',
    loadChildren: () => import('./pages/userinfo/userinfo.module').then( m => m.UserinfoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
