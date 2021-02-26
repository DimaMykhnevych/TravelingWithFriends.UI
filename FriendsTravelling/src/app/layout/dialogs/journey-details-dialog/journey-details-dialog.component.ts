import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJourneyModel } from 'src/app/core/models/journey';

@Component({
  selector: 'app-journey-details-dialog',
  templateUrl: './journey-details-dialog.component.html',
  styleUrls: ['./journey-details-dialog.component.scss'],
})
export class JourneyDetailsDialogComponent implements OnInit {
  public journey: IJourneyModel;
  constructor(
    public dialogRef: MatDialogRef<JourneyDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { journey: IJourneyModel }
  ) {
    this.journey = data.journey;
  }

  ngOnInit(): void {}
}
