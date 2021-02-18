import { Component, OnInit } from '@angular/core';
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
  constructor(private _journeyService: JourneyService) {}

  ngOnInit(): void {
    this.getUserJourneys();
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
