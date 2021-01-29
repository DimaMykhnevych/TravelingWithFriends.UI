import { IUserInfo } from './user-info';

export interface AuthResponse {
  isAuthorized: boolean;
  token: string;
  userInfo: IUserInfo;
}
