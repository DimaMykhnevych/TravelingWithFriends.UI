import { RequestStatuses } from '../enums/request-statuses';

export class RequestStatusMapper {
  public static requestStatusDictionary = {
    [RequestStatuses.accepted]: 'Accepted',
    [RequestStatuses.canceled]: 'Canceled',
    [RequestStatuses.pending]: 'Pending',
  };

  public static getRequestStatusString(
    requestStautsNumber: RequestStatuses
  ): string {
    return this.requestStatusDictionary[requestStautsNumber];
  }
}
