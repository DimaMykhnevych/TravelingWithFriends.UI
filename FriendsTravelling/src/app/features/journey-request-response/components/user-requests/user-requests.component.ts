import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { DialogConstants } from 'src/app/core/constants/dialog-constants';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';
import { CurrentUserService } from 'src/app/core/permission/services';
import { DialogService } from 'src/app/layout/confirm-dialog/serveices/dialog.service';
import { JourneyDetailsDialogComponent } from 'src/app/layout/journey-details-dialog/journey-details-dialog.component';
import { JourneyRequestService } from '../../services/journey-request.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss'],
})
export class UserRequestsComponent implements OnInit {
  public userRequests: IReviewJourneyRequestModel[] = [];
  public isLoading: boolean = true;
  constructor(
    private _journeyRequestService: JourneyRequestService,
    private _currentUserService: CurrentUserService,
    private _confirmDialogService: DialogService,
    private _toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserRequests();
  }

  public onJourneyDetailsClick(journeyId: number): void {
    this.openDialog(journeyId);
  }

  public onRequestDiscard(requestId: number): void {
    this._confirmDialogService
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

  private deleteRequest(requestId: number): void {
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
    this.dialog.open(JourneyDetailsDialogComponent, {
      data: {
        journey: this.userRequests.filter((r) => r.journey.id === journeyId)[0]
          .journey,
      },
    });
  }

  private getUserRequestsByUserId(userId: number): void {
    this._journeyRequestService
      .getUserRequestsWithJourneys(userId)
      .subscribe((resp) => {
        this.userRequests = resp;
        this.isLoading = false;
      });
  }

  private getUserRequests(): void {
    const currentUserInfo = this._currentUserService.userInfo;
    if (currentUserInfo.userId != undefined) {
      this.getUserRequestsByUserId(currentUserInfo.userId);
      return;
    }
    this._currentUserService.userInfoChanged.subscribe((resp) =>
      this.getUserRequestsByUserId(resp.userId)
    );
  }
}
