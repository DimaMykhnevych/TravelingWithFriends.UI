import { IImage } from './image.model';
import { IProfileUpdate } from './profile-update.model';

export interface IDialogResult {
  mainForm: IProfileUpdate;
  imageResponse: IImage;
}
