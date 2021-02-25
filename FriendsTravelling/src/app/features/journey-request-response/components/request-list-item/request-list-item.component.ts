import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatuses } from 'src/app/core/enums/request-statuses';
import { RequestStatusMapper } from 'src/app/core/mappers/request-status-mapper';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';

@Component({
  selector: 'app-request-list-item',
  templateUrl: './request-list-item.component.html',
  styleUrls: ['./request-list-item.component.scss'],
})
export class RequestListItemComponent implements OnInit {
  @Input() request: IReviewJourneyRequestModel;
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public onUserNameClick(e: Event): void {
    e.preventDefault();
    this._router.navigate(['/profile/user'], {
      queryParams: {
        userId: this.request.organizerId,
      },
    });
  }

  public getRequestStatusString(status: RequestStatuses): string {
    return RequestStatusMapper.getRequestStatusString(status);
  }

  public defineCardClass(): string {
    switch (this.request.journeyRequestStatus) {
      case RequestStatuses.accepted:
        return 'accepted';
      case RequestStatuses.canceled:
        return 'canceled';
      case RequestStatuses.pending:
        return 'pending';
      default:
        return 'pending';
    }
  }
}
