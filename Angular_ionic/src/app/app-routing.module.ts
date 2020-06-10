
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {    path: '', redirectTo: 'login', pathMatch: 'full'  },
  {    path: 'login', loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule) },
  {    path: 'menu',  loadChildren: () => import('./Pages/menu/menu.module').then( m => m.MenuPageModule)  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

