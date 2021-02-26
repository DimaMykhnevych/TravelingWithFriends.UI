import { RequestStatuses } from '../enums/request-statuses';

export interface IChangeRequestStatusModel {
  requestId: number;
  newStatus: RequestStatuses;
}
