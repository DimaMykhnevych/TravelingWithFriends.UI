import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogInfo } from '../models/dialog-info.model';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss'],
})
export class NotificationDialogComponent implements OnInit {
  public content: string;
  public title: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: IDialogInfo) {
    this.content = data.content;
    this.title = data.title;
  }

  ngOnInit(): void {}
}
