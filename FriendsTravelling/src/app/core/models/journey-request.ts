import { RequestStatuses } from '../enums/request-statuses';
import { IAppUserModel } from './app-user';

export interface IJourneyRequestModel {
  id: number;
  requestedJourneyId: number;
  journeyRequestStatus: RequestStatuses;
  organizerId: number;
  requestUserId: number;
  organizer: IAppUserModel;
  requestUser: IAppUserModel;
}
