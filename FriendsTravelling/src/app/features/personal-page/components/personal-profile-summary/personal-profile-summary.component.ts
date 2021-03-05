import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isNil } from 'lodash';
import { IAppUserModel } from 'src/app/core/models/app-user';
import { AppSettings } from 'src/app/core/settings';
import { ChangeProfileDialogComponent } from 'src/app/layout/dialogs/change-profile-dialog/change-profile-dialog.component';
import { IDialogResult } from 'src/app/layout/dialogs/change-profile-dialog/models/dialog-result.model';

@Component({
  selector: 'app-personal-profile-summary',
  templateUrl: './personal-profile-summary.component.html',
  styleUrls: ['./personal-profile-summary.component.scss'],
})
export class PersonalProfileSummaryComponent implements OnInit {
  @Input() public currentUserInfo: IAppUserModel;
  @Input() public isEditable: boolean;
  @Output()
  public onDialogClosed: EventEmitter<IDialogResult> = new EventEmitter<IDialogResult>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangeProfileDialogComponent, {
      data: {
        userInfo: this.currentUserInfo,
      },
    });

    dialogRef.afterClosed().subscribe((result: IDialogResult) => {
      this.onDialogClosed.emit(result);
    });
  }

  public createImgPath(): string {
    let path = this.currentUserInfo?.profileImage?.imagePath;
    if (!isNil(path) && path != '') {
      return `${AppSettings.hubHost}/${path}`;
    }
    return '../../../../assets/images/avatar-default.png';
  }
}
