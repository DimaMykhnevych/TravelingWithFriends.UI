import { Component, Input, OnInit } from '@angular/core';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent implements OnInit {
  @Input() public requests: IReviewJourneyRequestModel[];

  constructor() {}

  ngOnInit(): void {}
}
