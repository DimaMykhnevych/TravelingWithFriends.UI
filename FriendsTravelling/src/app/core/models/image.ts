import { IAppUserModel } from './app-user';

export interface IImageModel {
  id: number;
  imageTitle: string;
  imagePath: string;
  appUserId: number;
  appUser: IAppUserModel;
}
