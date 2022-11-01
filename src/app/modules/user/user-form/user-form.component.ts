import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from '../../../data/services/users.service';
import { User } from '../../../data/types/user.model';
import { ToggleFormDisabledFieldsDirective } from '../../../shared/toggle-form-disabled-fields.directive'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() mode: 'show' | 'edit' | 'new';
  @Input() id: number;
  public user: User;
  userForm: FormGroup;
  disableFields = ['firstName', 'lastName', 'email', 'authorizationLevel', 'activated']

  @Output() cancelAction = new EventEmitter<void>();
  @Output() okAction = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private userService: UsersService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      username: [
        {
          value: null,
          disabled: this.mode == 'show' || this.mode == 'edit',
        },
        [Validators.required, this.usernameUniqueValidator()],
      ],
      firstName: [
        { value: null, disabled: this.mode == 'show' },
        [Validators.required],
      ],
      lastName: [
        { value: null, disabled: this.mode == 'show' },
        [Validators.required],
      ],
      email: [
        { value: null, disabled: this.mode == 'show' },
        [Validators.required, Validators.email],
      ],
      authorizationLevel: [
        { value: 'user', disabled: this.mode == 'show' },
        [Validators.required],
      ],
      activated: [{ value: true, disabled: this.mode == 'show' }],
    });
    this.userService.getUserById(this.id).subscribe((u) => {
      this.userForm.patchValue(u);
      this.user = u;
    });
  }

  submitForm() {
    if (this.mode == 'edit' && this.userForm.valid) {
      this.userService.updateUser(this.userForm.getRawValue());
      this.okAction.emit();
      this.notification.success('Success', 'User edited successfully!');
    } else if (this.mode == 'new' && this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      this.okAction.emit();
      this.notification.success('Success', 'User added successfully!');
    } else {
      Object.values(this.userForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onCancel() {
    this.cancelAction.emit();
  }

  onEdit() {
    this.mode = 'edit'
  }

  onDelete() {
    this.modal.confirm({
      nzTitle: '<i>Delete confirmation</i>',
      nzContent: `<p>Do you want to delete user with id: ${this.id}?</p>`,
      nzOnOk: () => {
        this.okAction.emit();
        this.userService.removeUser(this.id);
        this.notification.success('Success', 'User deleted successfully!');
      },
    });
  }

  usernameUniqueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      let usernames: string[];
      this.userService.users$.subscribe(
        (u) => (usernames = u.map((u) => u.username))
      );

      return usernames.includes(value) ?  { uniqueUsername: false } : null;
    };
  }
}
