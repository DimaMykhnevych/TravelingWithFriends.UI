import { IAppUserModel } from './app-user';
import { IChatModel } from './chat';

export interface IUserChat {
  id: number;
  appUserId: number;
  chatId: number;

  chat: IChatModel;
  appUser: IAppUserModel;
}
