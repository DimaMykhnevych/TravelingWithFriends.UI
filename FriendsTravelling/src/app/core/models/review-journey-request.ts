import { RequestStatuses } from '../enums/request-statuses';
import { IAppUserModel } from './app-user';
import { IJourneyModel } from './journey';

export interface IReviewJourneyRequestModel {
  id: number;
  requestedJourneyId: number;
  journeyRequestStatus: RequestStatuses;
  organizerId: number;
  requestUserId: number;
  journey: IJourneyModel;
  organizer: IAppUserModel;
}
