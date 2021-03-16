import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IAppUserModel } from 'src/app/core/models/app-user';
import { IParticipantsDialogModel } from './models/participants-dialog.model';

@Component({
  selector: 'app-chat-participants-dialog',
  templateUrl: './chat-participants-dialog.component.html',
  styleUrls: ['./chat-participants-dialog.component.scss'],
})
export class ChatParticipantsDialogComponent implements OnInit {
  public users: IAppUserModel[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IParticipantsDialogModel,
    private _router: Router
  ) {
    this.users = data.users;
  }

  ngOnInit(): void {}

  public onUserClicked(userId: number): void {
    if (this.data.currentUserInfo.userId === userId) {
      this._router.navigate(['/profile']);
    } else {
      this._router.navigate(['/profile/user'], {
        queryParams: {
          userId: userId,
        },
      });
    }
  }
}
