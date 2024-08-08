import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetProfileComponent } from './get-profile/get-profile.component';

const routes: Routes = [
  {path:'getProfile',component:GetProfileComponent},
  {path:'user',loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path:'admin',loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
