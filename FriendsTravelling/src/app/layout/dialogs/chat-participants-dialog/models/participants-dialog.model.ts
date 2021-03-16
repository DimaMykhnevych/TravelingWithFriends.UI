import { IUserInfo } from 'src/app/core/auth';
import { IAppUserModel } from 'src/app/core/models/app-user';

export interface IParticipantsDialogModel {
  users: IAppUserModel[];
  currentUserInfo: IUserInfo;
}
