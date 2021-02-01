import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserInfoService } from 'src/app/core/auth';
import { CurrentUserService } from 'src/app/core/permission/services';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
})
export class PersonalPageComponent implements OnInit {
  public currentUserInfo: IUserInfo;

  constructor(
    private _currentUserService: CurrentUserService,
    private _userService: UserInfoService
  ) {
    this.currentUserInfo = {};
  }

  ngOnInit(): void {
    this._userService
      .loadUserInfo()
      .subscribe((response) => (this.currentUserInfo = response));
  }
}
