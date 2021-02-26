import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IDialogInfo } from '../../models/dialog-info.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { JourneyDetailsDialogComponent, NotificationDialogComponent } from '..';
import { IJourneyModel } from 'src/app/core/models/journey';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openConfirmDialog(
    data: IDialogInfo
  ): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '390px',
      disableClose: true,
      data: data,
    });
  }
  public openNotificationDialog(
    data: IDialogInfo
  ): MatDialogRef<NotificationDialogComponent> {
    return this.dialog.open(NotificationDialogComponent, {
      width: '390px',
      disableClose: true,
      data: data,
    });
  }

  public openJourneyDetailsDialog(
    data: IJourneyModel
  ): MatDialogRef<JourneyDetailsDialogComponent> {
    return this.dialog.open(JourneyDetailsDialogComponent, { data: data });
  }
}
