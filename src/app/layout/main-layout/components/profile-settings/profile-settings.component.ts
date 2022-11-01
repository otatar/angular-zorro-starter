import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from '../../../../data/services/users.service';
import { User } from '../../../../data/types/user.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup;

  @Input() id: number;
  public user: User;

  @Output() cancelAction = new EventEmitter<void>();
  @Output() okAction = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: [{ value: null, disabled: true }],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      authorizationLevel: [{ value: null, disabled: true }],
    });
    this.userService.getUserById(this.id).subscribe((u) => {
      this.profileForm.patchValue(u);
      this.user = u;
    });
  }

  public submitForm() {
    if (this.profileForm.valid) {
      this.user.firstName = this.profileForm.value.firstName;
      this.user.lastName = this.profileForm.value.lastName;
      this.user.email = this.profileForm.value.email;
      this.userService.updateUser(this.user);
      this.notification.success('Success', 'Profile update was successful!');
      this.okAction.emit();
    } else {
      if (this.profileForm.pristine) {
        Object.values(this.profileForm.controls).forEach(
          (control: {
            invalid: any;
            markAsDirty: () => void;
            updateValueAndValidity: (arg0: { onlySelf: boolean }) => void;
          }) => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          }
        );
      }
    }
  }

  public onCancel() {
    this.cancelAction.emit();
  }
}
