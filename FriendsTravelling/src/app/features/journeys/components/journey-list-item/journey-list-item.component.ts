import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJourneyModel } from 'src/app/core/models/journey';

@Component({
  selector: 'app-journey-list-item',
  templateUrl: './journey-list-item.component.html',
  styleUrls: ['./journey-list-item.component.scss'],
})
export class JourneyListItemComponent implements OnInit {
  @Input() public journey: IJourneyModel = null as any;
  @Output()
  public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public edit: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  public getFullRouteString(): string {
    let routeString = '';
    let routeLocations = this.journey.route.routeLocations;
    for (let i = 0; i < routeLocations.length; i++) {
      routeString += `${routeLocations[i].location.name} => `;
    }
    return routeString.slice(0, -4);
  }

  public onEditJourneyClick() {
    this.edit.emit(this.journey.id);
  }

  public onDeleteJourneyClick() {
    this.delete.emit(this.journey.id);
  }
}
