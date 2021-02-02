import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProfileUpdate } from './models/profile-update.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-profile-dialog',
  templateUrl: './change-profile-dialog.component.html',
  styleUrls: ['./change-profile-dialog.component.scss'],
})
export class ChangeProfileDialogComponent implements OnInit {
  public form: FormGroup = this._builder.group({});

  constructor(
    public dialogRef: MatDialogRef<ChangeProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProfileUpdate,
    private _builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._builder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      age: new FormControl('', Validators.required),
    });
  }

  public onSaveButtonClick(): void {
    this.dialogRef.close(this.form.value);
  }
}
