import { AuthGuard } from './guard/auth.guard';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {    path: '', redirectTo: 'welcome', pathMatch: 'full'  },
  {    path: 'login', loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule) },
  {
    path: 'menu',  loadChildren: () => import('./Pages/menu/menu.module').then( m => m.MenuPageModule),
  },
  {
    path: 'user-info',
     loadChildren: () => import('./Pages/user-info/user-info.module').then( m => m.UserInfoPageModule),
  },
  {
    path: 'work-profile',
     loadChildren: () => import('./Pages/work-profile/work-profile.module').then( m => m.WorkProfilePageModule),
  },
  {
    path: 'appraisal',
     loadChildren: () => import('./Pages/appraisal-details/appraisal-details.module').then( m => m.AppraisalDetailsPageModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./Pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

