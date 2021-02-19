import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserInfo, UserInfoService } from 'src/app/core/auth';
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
    private _router: Router,
    private _userService: UserProfileService,
    private _currentUserService: UserInfoService
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
        this.navigateToOwnerProfile();
      }
    });
  }

  private navigateToOwnerProfile(): void {
    this._currentUserService.loadUserInfo().subscribe((user) => {
      if (
        user.userId ===
        this.currentlyRequestedUserInfo?.userJourneys[0]?.journey?.organizerId
      ) {
        this._router.navigate(['/profile']);
      }
    });
  }
}
