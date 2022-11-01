import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MustMatch } from '../../../../shared/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  passwordVisible = false;
  newPasswordVisible = false;
  newPasswordAgainVisible = false;
  changePassForm: FormGroup;

  @Output() cancelAction = new EventEmitter<void>();
  @Output() okAction = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.changePassForm = this.fb.group(
      {
        password: [null, [Validators.required]],
        newPassword: [
          null,
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{6,}$'
            ),
          ],
        ],
        newPasswordAgain: [null, [Validators.required]],
      },
      {
        validator: MustMatch('newPassword', 'newPasswordAgain'),
      }
    );
  }

  public submitForm() {
    if (this.changePassForm.valid) {
      this.notification.success('Success', 'Password change was successful!');
      this.okAction.emit();
    } else {
      if (this.changePassForm.pristine) {
        Object.values(this.changePassForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  }

  public onCancel() {
    this.cancelAction.emit();
  }
}
