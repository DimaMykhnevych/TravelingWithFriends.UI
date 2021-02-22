import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJourneyModel } from 'src/app/core/models/journey';
import { ISearchJourneyModel } from 'src/app/core/models/search-journey';
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
  constructor(private _journeyService: JourneyService, private router: Router) {
    this.searchParams = { isForCurrentUser: false };
  }

  ngOnInit(): void {
    this.getUserJourneys();
  }

  public onUserNameClicked(userId: number) {
    this.router.navigate(['/profile/user'], {
      queryParams: {
        userId: userId,
      },
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
