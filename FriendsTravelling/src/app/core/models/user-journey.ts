import { IAppUserModel } from './app-user';
import { IJourneyModel } from './journey';

export interface IUserJourneysModel {
  id: number;
  appUserId: number;
  journeyId: number;
  journey: IJourneyModel;
  appUser: IAppUserModel;
}
