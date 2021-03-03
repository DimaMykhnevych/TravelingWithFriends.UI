import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DialogConstants } from 'src/app/core/constants/dialog-constants';
import { RequestStatuses } from 'src/app/core/enums/request-statuses';
import { JourneyRequestsService } from 'src/app/core/journey-requests/journey-requests.service';
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
export class UserInboxRequestsComponent implements OnInit, OnDestroy {
  public userInboxRequests: IReviewJourneyRequestModel[] = [];
  public isLoading: boolean = true;
  private _hubSubscription: Subscription;

  constructor(
    private _journeyRequestService: JourneyRequestService,
    private _currentUserService: CurrentUserService,
    private _dialogService: DialogService,
    private _journeyRequestsHub: JourneyRequestsService
  ) {}

  ngOnInit(): void {
    this.getUserInboxRequests().subscribe();
    this._hubSubscription = this._journeyRequestsHub
      .onRequestUpdate()
      .pipe(switchMap((x) => this.getUserInboxRequests()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._hubSubscription.unsubscribe();
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
      .pipe(
        filter(Boolean),
        switchMap((x) => this.getUserInboxRequests())
      )
      .subscribe();
  }

  private openDialog(journeyId: number): void {
    const journey = this.userInboxRequests.filter(
      (r) => r.journey.id === journeyId
    )[0].journey;
    this._dialogService.openJourneyDetailsDialog(journey);
  }

  private getUserInboxRequestsByUserId(
    userId: number
  ): Observable<IReviewJourneyRequestModel[]> {
    return this._journeyRequestService.getUserInboxRequests(userId).pipe(
      tap((resp) => {
        this.userInboxRequests = resp;
        this.isLoading = false;
      })
    );
  }

  private getUserInboxRequests(): Observable<IReviewJourneyRequestModel[]> {
    const currentUserInfo = this._currentUserService.userInfo;
    if (currentUserInfo.userId) {
      return this.getUserInboxRequestsByUserId(currentUserInfo.userId);
    }
    return this._currentUserService.userInfoChanged.pipe(
      switchMap((resp) => this.getUserInboxRequestsByUserId(resp.userId))
    );
  }
}
