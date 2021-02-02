import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserInfoService } from 'src/app/core/auth';
import { MatDialog } from '@angular/material/dialog';
import { ChangeProfileDialogComponent } from 'src/app/layout/change-profile-dialog/change-profile-dialog.component';
import { IProfileUpdate } from 'src/app/layout/change-profile-dialog/models/profile-update.model';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
})
export class PersonalPageComponent implements OnInit {
  public currentUserInfo: IUserInfo;

  constructor(private _userService: UserInfoService, public dialog: MatDialog) {
    this.currentUserInfo = {};
  }

  ngOnInit(): void {
    this._userService
      .loadUserInfo()
      .subscribe((response) => (this.currentUserInfo = response));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangeProfileDialogComponent, {});

    dialogRef.afterClosed().subscribe((result: IProfileUpdate) => {
      console.log(result);
    });
  }
}
