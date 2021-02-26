import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent implements OnInit {
  @Output() detailsClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() onRequestDiscard: EventEmitter<number> = new EventEmitter<number>();
  @Input() public requests: IReviewJourneyRequestModel[];

  constructor() {}

  ngOnInit(): void {}

  public onDetailsBtnClick(journeyId: number): void {
    this.detailsClicked.emit(journeyId);
  }

  public onRequestDiscardBtnClick(requestId: number): void {
    this.onRequestDiscard.emit(requestId);
  }
}
