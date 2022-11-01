import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../types/user.model';
import { users } from './user-list';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly _userSource = new BehaviorSubject<User[]>(users);

  readonly users$ = this._userSource.asObservable();

  constructor() {}

  getUsers(): User[] {
    return this._userSource.getValue();
  }

  private _setUsers(users: User[]): void {
    this._userSource.next(users);
  }

  addUser(user: User): void {
    user.id = this._generateId();
    const users = [...this.getUsers(), user];
    this._setUsers(users);
  }

  updateUser(user: User) {
    const users = this.getUsers();
    const updatedUsers = users.map((el, index) =>
      el.id == user.id ? (users[index] = user) : el
    );
    this._setUsers(updatedUsers);
  }

  removeUser(id: number): void {
    const users = this.getUsers().filter((u) => u.id !== id);
    this._setUsers(users);
  }

  getUserById(id: number) {
    const user = this.getUsers().filter((u) => u.id == id)[0];
    return of(user);
  }

  private _generateId = (): number => {
    const users = this.getUsers();
    const sorted = [...users].sort((a, b) => b.id - a.id);
    return sorted[0].id + 1;
  };
}
