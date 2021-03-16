import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppUserModel } from 'src/app/core/models/app-user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: IAppUserModel[];
  @Output() userClicked: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  public onUserClicked(userId: number): void {
    this.userClicked.emit(userId);
  }
}
