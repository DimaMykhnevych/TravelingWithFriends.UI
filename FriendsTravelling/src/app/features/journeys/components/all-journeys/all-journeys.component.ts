import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatuses } from 'src/app/core/enums/request-statuses';
import { IAddJourneyRequestModel } from 'src/app/core/models/add-journey-request';
import { IJourneyModel } from 'src/app/core/models/journey';
import { ISearchJourneyModel } from 'src/app/core/models/search-journey';
import { CurrentUserService } from 'src/app/core/permission/services';
import { JourneyRequestService } from '../../services/journey-request.service';
import { JourneyService } from '../../services/journey.service';

@Component({
  selector: 'app-all-journeys',
  templateUrl: './all-journeys.component.html',
  styleUrls: ['./all-journeys.component.scss'],
})
export class AllJourneysComponent implements OnInit {
  public journeys: IJourneyModel[] = [];
  public isLoading: boolean = true;
  public isSearching: boolean = false;
  public searchParams: ISearchJourneyModel;
  constructor(
    private _journeyService: JourneyService,
    private _journeyRequestService: JourneyRequestService,
    private _currentUserService: CurrentUserService,
    private router: Router
  ) {
    this.searchParams = { isForCurrentUser: false };
  }

  ngOnInit(): void {
    this.getUserJourneys();
  }

  public onUserNameClicked(userId: number): void {
    this.router.navigate(['/profile/user'], {
      queryParams: {
        userId: userId,
      },
    });
  }

  public onJoinBtnCLicked(journey: IJourneyModel): void {
    const addRequestModel: IAddJourneyRequestModel = {
      id: 0,
      requestedJourneyId: journey.id,
      journeyRequestStatus: RequestStatuses.pending,
      organizerId: journey.organizerId,
      requestUserId: this._currentUserService.userInfo.userId,
    };
    this._journeyRequestService
      .addJourneyRequest(addRequestModel)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public onJourneySearch(searchParams: ISearchJourneyModel): void {
    this.searchParams = searchParams;
    this.searchParams.isForCurrentUser = false;
    this.isSearching = true;
    this.getUserJourneys();
  }

  private getUserJourneys(): void {
    this._journeyService.getAllJourneys(this.searchParams).subscribe((resp) => {
      if (resp) {
        this.isLoading = false;
        this.journeys = resp;
      }
    });
  }
}
