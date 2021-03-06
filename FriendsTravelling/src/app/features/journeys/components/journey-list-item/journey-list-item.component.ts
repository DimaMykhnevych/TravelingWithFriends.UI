import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNil } from 'lodash';
import { IJourneyModel } from 'src/app/core/models/journey';
import { AppSettings } from 'src/app/core/settings';

@Component({
  selector: 'app-journey-list-item',
  templateUrl: './journey-list-item.component.html',
  styleUrls: ['./journey-list-item.component.scss'],
})
export class JourneyListItemComponent implements OnInit {
  @Input() public journey: IJourneyModel;
  @Input() public isEditable: boolean;
  @Input() public isJourneyRequestReviewed: boolean;
  @Output()
  public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public edit: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public usernameClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public joinBtnCliced: EventEmitter<IJourneyModel> = new EventEmitter<IJourneyModel>();
  public isJoinBtnDisabled: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public createImgPath(): string {
    let path: string = this.journey?.userJourneys[0]?.appUser?.profileImage
      ?.imagePath;
    if (!isNil(path) && path != '') {
      return `${AppSettings.hubHost}/${path}`;
    }
    return '../../../../../assets/images/avatar-default.png';
  }

  public onEditJourneyClick(): void {
    this.edit.emit(this.journey.id);
  }

  public onDeleteJourneyClick(): void {
    this.delete.emit(this.journey.id);
  }

  public onUserNameClick(e: Event): void {
    e.preventDefault();
    this.usernameClicked.emit(this.journey.userJourneys[0].appUserId);
  }

  public onJoinButtonClick(): void {
    this.isJoinBtnDisabled = true;
    this.joinBtnCliced.emit(this.journey);
  }
}
