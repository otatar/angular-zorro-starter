import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutWithFooterComponent } from './layout-with-footer/layout-with-footer.component';
import { ChangePasswordComponent } from './main-layout/components/change-password/change-password.component';
import { ProfileSettingsComponent } from './main-layout/components/profile-settings/profile-settings.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [SharedModule, LayoutRoutingModule],
  exports: [LayoutRoutingModule],
  declarations: [
    MainLayoutComponent,
    LayoutWithFooterComponent,
    ChangePasswordComponent,
    ProfileSettingsComponent,
  ],
})
export class LayoutModule {}
