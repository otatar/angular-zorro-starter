import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLoginComponent } from './mian-login/mian-login.component';

const routes: Routes = [
  { path: '', component: MainLoginComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class LoginRoutingModule { }
