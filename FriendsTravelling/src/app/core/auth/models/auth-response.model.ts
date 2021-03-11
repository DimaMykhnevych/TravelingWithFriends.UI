import { LoginErrorCodes } from '../enums/login-errors-code.enum';
import { IUserInfo } from './user-info';

export interface AuthResponse {
  isAuthorized: boolean;
  token: string;
  userInfo: IUserInfo;
  loginErrorCode: LoginErrorCodes;
}
