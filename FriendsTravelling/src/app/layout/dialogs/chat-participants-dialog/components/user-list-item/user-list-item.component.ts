import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNil } from 'lodash';
import { IAppUserModel } from 'src/app/core/models/app-user';
import { AppSettings } from 'src/app/core/settings';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  @Input() user: IAppUserModel;
  @Output() userClicked: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  public createImgPath(): string {
    const imagePath: string = this.user.profileImage?.imagePath;
    if (!isNil(imagePath) && imagePath != '') {
      return `${AppSettings.hubHost}/${imagePath}`;
    }
    return 'assets/images/avatar-default.png';
  }

  public onUserClick(): void {
    this.userClicked.emit(this.user.id);
  }
}
