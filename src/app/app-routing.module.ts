import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list', loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './usuario/login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './usuario/perfil/perfil.module#PerfilPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
