import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../core/auth.service';
import { UserAccountState } from '../../data/types/userAccount';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import sideBarItems from './side-bar-items';
import { ThemeService } from '../../core/theme.service'

@Component({
  selector: 'mian-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  isCollapsed: boolean;
  menus = sideBarItems;
  menuOpenStateMap = Array<boolean>(this.menus.length).fill(false);
  userAccount: UserAccountState;

  //Modal refs
  private changePassModal: NzModalRef;

  profileMenuItems = [
    {
      title: 'Profile Settings',
      icon: 'profile',
      action: this.profileMenuSettingsClick.bind(this),
    },
    {
      title: 'Change Password',
      icon: 'lock',
      action: this.profileMenuChangePasswordClick.bind(this),
    },
    {
      title: 'Log Out',
      icon: 'logout',
      action: this.profileMenuLogoutClick.bind(this),
    },
  ];

  constructor(
    private authService: AuthService,
    private modal: NzModalService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.authService.userAccount$.subscribe((ua) => (this.userAccount = ua));
  }
  ngOnInit(): void {}

  menuOpenHandler(pos: number): void {
    this.menuOpenStateMap.forEach((el, i) => {
      this.menuOpenStateMap[i] = i == pos ? true : false;
    });
  }

  menuClickHandler(): void {
    this.menuOpenStateMap.fill(false);
  }

  profileMenuClickHandler(position: number): void {
    this.profileMenuItems[position]['action']();
  }

  profileMenuSettingsClick(): void {
    this.changePassModal = this.modal.create({
      nzTitle: 'Profile Settings',
      nzContent: ProfileSettingsComponent,
      nzComponentParams: {
        id: this.userAccount.user.id
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: null,
    });
    const component = this.changePassModal.getContentComponent();
    component.cancelAction.subscribe({
      next: () => {
        this.changePassModal.destroy();
      },
    });
    component.okAction.subscribe({
      next: () => {
        this.changePassModal.destroy();
      },
    });
  }

  profileMenuChangePasswordClick(): void {
    this.changePassModal = this.modal.create({
      nzTitle: 'Change Password',
      nzContent: ChangePasswordComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: null,
    });
    const component = this.changePassModal.getContentComponent();
    component.cancelAction.subscribe({
      next: () => {
        this.changePassModal.destroy();
      },
    });
    component.okAction.subscribe({
      next: () => {
        this.changePassModal.destroy();
      },
    });
  }

  profileMenuLogoutClick(): void {
    this.modal.confirm({
      nzTitle: '<i>Log out confirmation</i>',
      nzContent: '<p>Do you want to log out?</p>',
      nzOnOk: () => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      },
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }
}
