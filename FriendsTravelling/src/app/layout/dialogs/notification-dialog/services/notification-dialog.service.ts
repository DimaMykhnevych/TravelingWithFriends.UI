import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogInfo } from '../../../models/dialog-info.model';
import { NotificationDialogComponent } from '../notification-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationDialogService {
  constructor(private dialog: MatDialog) {}

  public openNotificationDialog(data: IDialogInfo) {
    return this.dialog.open(NotificationDialogComponent, {
      width: '390px',
      disableClose: true,
      data: data,
    });
  }
}
