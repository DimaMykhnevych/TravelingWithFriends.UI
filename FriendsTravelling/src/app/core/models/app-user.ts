import { IImageModel } from './image';
import { IUserJourneysModel } from './user-journey';

export interface IAppUserModel {
  id?: number;
  userName?: string;
  role?: string;
  city?: string;
  country?: string;
  age?: number;
  email?: string;
  userJourneys: IUserJourneysModel[];
  profileImage: IImageModel;
}
