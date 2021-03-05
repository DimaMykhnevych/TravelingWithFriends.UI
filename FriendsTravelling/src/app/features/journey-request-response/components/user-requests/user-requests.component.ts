import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DialogConstants } from 'src/app/core/constants/dialog-constants';
import { JourneyRequestsService } from 'src/app/core/journey-requests/journey-requests.service';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';
import { CurrentUserService } from 'src/app/core/permission/services';
import { DialogService } from 'src/app/layout/dialogs/serveices/dialog.service';
import { JourneyRequestService } from '../../services/journey-request.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss'],
})
export class UserRequestsComponent implements OnInit, OnDestroy {
  public userRequests: IReviewJourneyRequestModel[] = [];
  public isLoading: boolean = true;
  private _hubSubscription: Subscription;
  constructor(
    private _journeyRequestService: JourneyRequestService,
    private _currentUserService: CurrentUserService,
    private _dialogService: DialogService,
    private _toastr: ToastrService,
    private _journeyRequestsHub: JourneyRequestsService
  ) {}

  ngOnInit(): void {
    this.getUserRequests().subscribe();
    this._hubSubscription = this._journeyRequestsHub
      .onRequestUpdate()
      .pipe(switchMap((x) => this.getUserRequests()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._hubSubscription.unsubscribe();
  }

  public onJourneyDetailsClick(journeyId: number): void {
    this.openDialog(journeyId);
  }

  public onRequestDiscard(requestId: number): void {
    this._dialogService
      .openConfirmDialog({
        title: DialogConstants.deleteRequestDialogTitle,
        content: DialogConstants.deleteRequestDialogContent,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == 'yes') {
          this.deleteRequest(requestId);
        }
      });
  }

  private deleteRequest(requestId: number) {
    this._journeyRequestService
      .deleteJourneyRequest(requestId)
      .pipe(filter(Boolean))
      .subscribe((response) => {
        if (response) {
          this._toastr.success('The request was successfully discarded');
          this.getUserRequests();
        }
        //TODO Handle Errors
      });
  }

  private openDialog(journeyId: number): void {
    const journey = this.userRequests.filter(
      (r) => r.journey.id === journeyId
    )[0].journey;
    this._dialogService.openJourneyDetailsDialog(journey);
  }

  private getUserRequestsByUserId(
    userId: number
  ): Observable<IReviewJourneyRequestModel[]> {
    return this._journeyRequestService.getUserRequestsWithJourneys(userId).pipe(
      tap((resp) => {
        this.userRequests = resp;
        this.isLoading = false;
      })
    );
  }

  private getUserRequests(): Observable<IReviewJourneyRequestModel[]> {
    const currentUserInfo = this._currentUserService.userInfo;
    if (currentUserInfo.userId != undefined) {
      return this.getUserRequestsByUserId(currentUserInfo.userId);
    }
    return this._currentUserService.userInfoChanged.pipe(
      switchMap((resp) => this.getUserRequestsByUserId(resp.userId))
    );
  }
}
