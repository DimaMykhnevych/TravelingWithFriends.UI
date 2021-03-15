import { IAppUserModel } from './app-user';
import { IJourneyModel } from './journey';
import { IMessageModel } from './message';
import { IUserChat } from './user-chat';

export interface IChatModel {
  id: number;
  name: string;
  creationDate: Date;
  journeyChatId: number;

  userChats: IUserChat[];
  journey: IJourneyModel;
  messages: IMessageModel[];
  journeyCreator: IAppUserModel;
}
