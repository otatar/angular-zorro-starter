import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../../core/auth.service';
import { UsersService } from '../../../data/services/users.service';
import { User } from '../../../data/types/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
})
export class MainLoginComponent implements OnInit {
  passwordVisible = false;
  loginForm: FormGroup;
  users: User[];

  submitForm(): void {
    if (this.loginForm.valid) {
      const user = this._login(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      if (user) {
        this.authService.login(user, this.loginForm.value.remember);        
      } else {
        this.notification.create('error', `Can't log in`, `Username and/or password are incorrect!`)
      }
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private notification: NzNotificationService
  ) {
    //Get Users
    this.usersService.users$.subscribe((u) => (this.users = u));
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  private _login(username: string, password: string): User | undefined {
    return this.users.find((u) => u.username == username);
  }
}
