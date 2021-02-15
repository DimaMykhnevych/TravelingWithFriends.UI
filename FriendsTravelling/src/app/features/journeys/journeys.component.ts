import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss'],
})
export class JourneysComponent implements OnInit {
  public journeyId: number = 0;
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((journey) => {
      this.journeyId = parseInt(journey['journeyId']);
      if (isNaN(this.journeyId)) {
        this.journeyId = 0;
      }
    });
  }
}
