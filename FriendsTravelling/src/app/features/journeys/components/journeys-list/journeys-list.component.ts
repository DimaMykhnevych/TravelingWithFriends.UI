import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJourneyModel } from 'src/app/core/models/journey';

@Component({
  selector: 'app-journeys-list',
  templateUrl: './journeys-list.component.html',
  styleUrls: ['./journeys-list.component.scss'],
})
export class JourneysListComponent implements OnInit {
  @Input() public journeys: IJourneyModel[] = [];
  @Input() public isEditable: boolean;
  @Output()
  public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public edit: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public usernameClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public joinBtnClicked: EventEmitter<IJourneyModel> = new EventEmitter<IJourneyModel>();

  constructor() {}

  ngOnInit(): void {}

  public onEditJourney(journeyId: number): void {
    this.edit.emit(journeyId);
  }

  public onDeleteJourney(journeyId: number): void {
    this.delete.emit(journeyId);
  }

  public onUserNameClicked(userId: number): void {
    this.usernameClicked.emit(userId);
  }

  public onjoinBtnCliced(journey: IJourneyModel): void {
    this.joinBtnClicked.emit(journey);
  }
}
