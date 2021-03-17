import { IAppUserModel } from './app-user';
import { IChatModel } from './chat';

export interface IMessageModel {
  id?: number;
  content: string;
  sendingDate: Date;
  appUserId: number;
  chatId: number;
  chat?: IChatModel;
  sender?: IAppUserModel;
}
