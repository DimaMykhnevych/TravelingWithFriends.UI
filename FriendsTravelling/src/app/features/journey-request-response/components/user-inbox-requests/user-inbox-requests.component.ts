import { Component, OnInit } from '@angular/core';
import { DialogConstants } from 'src/app/core/constants/dialog-constants';
import { RequestStatuses } from 'src/app/core/enums/request-statuses';
import { IChangeRequestStatusModel } from 'src/app/core/models/change-request-status';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';
import { CurrentUserService } from 'src/app/core/permission/services';
import { DialogService } from 'src/app/layout/dialogs/serveices/dialog.service';
import { JourneyRequestService } from '../../services/journey-request.service';

@Component({
  selector: 'app-user-inbox-requests',
  templateUrl: './user-inbox-requests.component.html',
  styleUrls: ['./user-inbox-requests.component.scss'],
})
export class UserInboxRequestsComponent implements OnInit {
  public userInboxRequests: IReviewJourneyRequestModel[] = [];
  public isLoading: boolean = true;
  constructor(
    private _journeyRequestService: JourneyRequestService,
    private _currentUserService: CurrentUserService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getUserInboxRequests();
  }

  public onJourneyDetailsClick(journeyId: number): void {
    this.openDialog(journeyId);
  }

  public onRequestAccept(requestId: number): void {
    this.openConfirmationDialog({
      requestId: requestId,
      newStatus: RequestStatuses.accepted,
    });
  }

  public onRequestDecline(requestId: number): void {
    this.openConfirmationDialog({
      requestId: requestId,
      newStatus: RequestStatuses.canceled,
    });
  }

  private openConfirmationDialog(status: IChangeRequestStatusModel): void {
    let title =
      status.newStatus === RequestStatuses.accepted
        ? DialogConstants.acceptRequestTitle
        : DialogConstants.declineRequestTitle;
    let content =
      status.newStatus === RequestStatuses.accepted
        ? DialogConstants.acceptRequestContent
        : DialogConstants.declineRequestContent;
    this._dialogService
      .openConfirmDialog({
        title: title,
        content: content,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == 'yes') {
          this.changeRequestStatus(status);
        }
      });
  }

  private changeRequestStatus(status: IChangeRequestStatusModel): void {
    this._journeyRequestService
      .updateRequestStatus(status)
      .subscribe((response) => {
        if (response) {
          this.getUserInboxRequests();
        }
      });
  }

  private openDialog(journeyId: number): void {
    const journey = this.userInboxRequests.filter(
      (r) => r.journey.id === journeyId
    )[0].journey;
    this._dialogService.openJourneyDetailsDialog(journey);
  }

  private getUserInboxRequestsByUserId(userId: number): void {
    this._journeyRequestService
      .getUserInboxRequests(userId)
      .subscribe((resp) => {
        this.userInboxRequests = resp;
        this.isLoading = false;
      });
  }

  private getUserInboxRequests(): void {
    const currentUserInfo = this._currentUserService.userInfo;
    if (currentUserInfo.userId != undefined) {
      this.getUserInboxRequestsByUserId(currentUserInfo.userId);
      return;
    }
    this._currentUserService.userInfoChanged.subscribe((resp) =>
      this.getUserInboxRequestsByUserId(resp.userId)
    );
  }
}
