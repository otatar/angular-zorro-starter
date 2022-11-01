import { User } from "./user.model";

export interface UserAccountState {
  isLoggedIn: boolean,
  jwt: string | null,
  user: User | null
}