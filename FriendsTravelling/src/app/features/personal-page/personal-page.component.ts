import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth';
import { MatDialog } from '@angular/material/dialog';
import { IProfileUpdate } from 'src/app/layout/change-profile-dialog/models/profile-update.model';
import { UserProfileService } from './services/user-profile.service';
import { isNil } from 'lodash';
import { Router } from '@angular/router';
import { IDialogResult } from 'src/app/layout/change-profile-dialog/models/dialog-result.model';
import { IAppUserModel } from 'src/app/core/models/app-user';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
})
export class PersonalPageComponent implements OnInit {
  public currentUserInfo: IAppUserModel;

  constructor(
    private _userProfileService: UserProfileService,
    public dialog: MatDialog,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._userProfileService
      .getCurrentlyLoggedInUser()
      .subscribe((response) => {
        this.currentUserInfo = response;
      });
  }

  public afterDialogClosed(result: IDialogResult): void {
    if (!isNil(result)) {
      if (result.mainForm.userName != this.currentUserInfo.userName) {
        this.logOut();
      }
      if (!isNil(result.imageResponse)) {
        this.currentUserInfo.profileImage.imagePath =
          result.imageResponse.imagePath;
      }
      result.mainForm.id = Number(this.currentUserInfo.id);
      this._userProfileService
        .updateUserProfile(result.mainForm)
        .subscribe((response) => {
          this.mapUserInfo(response);
        });
    }
  }

  private mapUserInfo(response: IProfileUpdate): void {
    this.currentUserInfo.userName = response.userName;
    this.currentUserInfo.age = response.age;
    this.currentUserInfo.city = response.city;
    this.currentUserInfo.country = response.country;
    this.currentUserInfo.email = response.email;
  }

  private logOut(): void {
    this._authService.unauthorize();
    this.router.navigate(['/login']);
  }
}
