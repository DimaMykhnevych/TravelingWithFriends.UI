import { Component, OnInit } from '@angular/core';
import { AuthService, IUserInfo, UserInfoService } from 'src/app/core/auth';
import { MatDialog } from '@angular/material/dialog';
import { ChangeProfileDialogComponent } from 'src/app/layout/change-profile-dialog/change-profile-dialog.component';
import { IProfileUpdate } from 'src/app/layout/change-profile-dialog/models/profile-update.model';
import { UserProfileService } from '../services/user-profile.service';
import { isNil } from 'lodash';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
})
export class PersonalPageComponent implements OnInit {
  public currentUserInfo: IUserInfo;

  constructor(
    private _userService: UserInfoService,
    private _userProfileService: UserProfileService,
    public dialog: MatDialog,
    private _authService: AuthService,
    private router: Router
  ) {
    this.currentUserInfo = {};
  }

  ngOnInit(): void {
    this._userService
      .loadUserInfo()
      .subscribe((response) => (this.currentUserInfo = response));
    // this.currentUserInfo = this._currentUserService.userInfo;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangeProfileDialogComponent, {
      data: {
        userInfo: this.currentUserInfo,
      },
    });

    dialogRef.afterClosed().subscribe((result: IProfileUpdate) => {
      if (!isNil(result)) {
        if (result.userName != this.currentUserInfo.username) {
          this.logOut();
        }
        result.id = Number(this.currentUserInfo.userId);
        this._userProfileService
          .updateUserProfile(result)
          .subscribe((response) => {
            this.mapUserInfo(response);
          });
      }
    });
  }

  private mapUserInfo(response: IProfileUpdate): void {
    this.currentUserInfo.username = response.userName;
    this.currentUserInfo.age = response.age;
    this.currentUserInfo.city = response.city;
    this.currentUserInfo.country = response.country;
    this.currentUserInfo.email = response.email;
  }

  private logOut(): void {
    this._authService.unauthorize();
    this.router.navigate(['/login']);
  }

  // public onUploadImageClick(form: HTMLFormElement): void {
  //   console.log(form);
  // }
}
