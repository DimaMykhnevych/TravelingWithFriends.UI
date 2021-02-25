import { Component, OnInit } from '@angular/core';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';
import { CurrentUserService } from 'src/app/core/permission/services';
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
    private _currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.getUserRequests();
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
