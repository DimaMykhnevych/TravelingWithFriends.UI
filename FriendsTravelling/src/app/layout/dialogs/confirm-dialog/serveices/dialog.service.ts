import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogInfo } from '../../../models/dialog-info.model';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openConfirmDialog(data: IDialogInfo) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '390px',
      disableClose: true,
      data: data,
    });
  }
}
