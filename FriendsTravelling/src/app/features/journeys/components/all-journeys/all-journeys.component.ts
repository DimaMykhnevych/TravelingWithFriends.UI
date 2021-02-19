import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJourneyModel } from 'src/app/core/models/journey';
import { JourneyService } from '../../services/journey.service';

@Component({
  selector: 'app-all-journeys',
  templateUrl: './all-journeys.component.html',
  styleUrls: ['./all-journeys.component.scss'],
})
export class AllJourneysComponent implements OnInit {
  public journeys: IJourneyModel[] = [];
  public isLoading: boolean = true;
  constructor(
    private _journeyService: JourneyService,
    private router: Router
  ) {}

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

  private getUserJourneys(): void {
    this._journeyService.getAllJourneys().subscribe((resp) => {
      if (resp) {
        this.isLoading = false;
        this.journeys = resp;
      }
    });
  }
}
