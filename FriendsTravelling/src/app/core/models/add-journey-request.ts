import { RequestStatuses } from '../enums/request-statuses';

export interface IAddJourneyRequestModel {
  id: number;
  requestedJourneyId: number;
  journeyRequestStatus: RequestStatuses;
  organizerId: number;
  requestUserId: number;
}
