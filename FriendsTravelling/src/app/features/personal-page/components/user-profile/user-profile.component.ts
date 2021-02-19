import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppUserModel } from 'src/app/core/models/app-user';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public userId: number;
  public currentlyRequestedUserInfo: IAppUserModel;
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.getUserInfo();
  }

  private getUserId(): void {
    this._route.queryParams.subscribe((user) => {
      this.userId = parseInt(user['userId']);
    });
  }
  private getUserInfo(): void {
    this._userService.getUserById(this.userId).subscribe((response) => {
      if (response) {
        this.currentlyRequestedUserInfo = response;
      }
    });
  }
}
