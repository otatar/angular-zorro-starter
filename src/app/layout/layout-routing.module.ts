import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from '../core/logged-in.guard';
import { LayoutWithFooterComponent } from './layout-with-footer/layout-with-footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canLoad: [LoggedInGuard],
        loadChildren: () =>
          import('../modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'user',
        canLoad: [LoggedInGuard],
        loadChildren: () =>
          import('../modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'graph',
        canLoad: [LoggedInGuard],
        loadChildren: () =>
          import('../modules/chart/chart.module').then((m) => m.ChartModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../modules/about/about.module').then((m) => m.AboutModule),
      },
    ],
  },
  {
    path: '',
    component: LayoutWithFooterComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../modules/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
