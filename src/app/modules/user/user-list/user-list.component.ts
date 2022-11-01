import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from '../../../data/services/users.service';
import { User } from '../../../data/types/user.model';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { DataTableColumn } from '../../../shared/data-table/types';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  columns: DataTableColumn[] = [
    { key: 'id', name: 'ID', width: 5 },
    { key: 'username', name: 'Username' },
    { key: 'firstName', name: 'First Name' },
    { key: 'lastName', name: 'Last Name' },
    { key: 'email', name: 'Email' },
  ];

  viewUserModal: NzModalRef

  constructor(
    private userService: UsersService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {
    this.userService.users$.subscribe((u) => {this.users = u});
  }

  ngOnInit() {}

  onViewEvent(id: number) {
    this.viewUserModal = this.modal.create({
      nzTitle: 'User Details',
      nzContent: UserFormComponent,
      nzComponentParams: {
        mode: 'show',
        id: id
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: null,
    });
    const component = this.viewUserModal.getContentComponent();
    component.cancelAction.subscribe({
      next: () => {
        this.viewUserModal.destroy();
      },
    });
    component.okAction.subscribe({
      next: () => {
        this.viewUserModal.destroy();
      },
    });
  }

  onEditEvent(id: number) {
    this.viewUserModal = this.modal.create({
      nzTitle: 'User Details',
      nzContent: UserFormComponent,
      nzComponentParams: {
        mode: 'edit',
        id: id
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: null,
    });
    const component = this.viewUserModal.getContentComponent();
    component.cancelAction.subscribe({
      next: () => {
        this.viewUserModal.destroy();
      },
    });
    component.okAction.subscribe({
      next: () => {
        this.viewUserModal.destroy();
      },
    });
  }

  onNewEvent() {
    this.viewUserModal = this.modal.create({
      nzTitle: 'New User',
      nzContent: UserFormComponent,
      nzComponentParams: {
        mode: 'new',
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzFooter: null,
    });
    const component = this.viewUserModal.getContentComponent();
    component.cancelAction.subscribe({
      next: () => {
        this.viewUserModal.destroy();
      },
    });
    component.okAction.subscribe({
      next: () => {
        this.viewUserModal.destroy();
      },
    });
  }

  onDeleteEvent(id: number) {
    this.modal.confirm({
      nzTitle: '<i>Delete confirmation</i>',
      nzContent: `<p>Do you want to delete user with id: ${id}?</p>`,
      nzOnOk: () => {
        this.userService.removeUser(id);
        this.notification.success('Success', 'User deleted successfully!');
      },
    });
  }
}
