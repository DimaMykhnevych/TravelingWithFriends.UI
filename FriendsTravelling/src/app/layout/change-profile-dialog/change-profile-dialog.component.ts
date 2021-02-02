import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUserInfo } from 'src/app/core/auth';

@Component({
  selector: 'app-change-profile-dialog',
  templateUrl: './change-profile-dialog.component.html',
  styleUrls: ['./change-profile-dialog.component.scss'],
})
export class ChangeProfileDialogComponent implements OnInit {
  public form: FormGroup = this._builder.group({});
  public imageUploadForm: FormGroup = this._builder.group({});

  constructor(
    public dialogRef: MatDialogRef<ChangeProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userInfo: IUserInfo },
    private _builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._builder.group({
      userName: new FormControl(this.data.userInfo.username, [
        Validators.required,
      ]),
      email: new FormControl(this.data.userInfo.email, [
        Validators.required,
        Validators.email,
      ]),
      country: new FormControl(this.data.userInfo.country, [
        Validators.required,
      ]),
      city: new FormControl(this.data.userInfo.city, [Validators.required]),
      age: new FormControl(this.data.userInfo.age, Validators.required),
    });
    this.imageUploadForm = this._builder.group({
      profileImage: new FormControl(),
    });
  }

  get email() {
    return this.form.get('email');
  }

  public getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  public onSaveButtonClick(): void {
    this.dialogRef.close(this.form.value);
  }

  public onImageUpload(event: Event): void {}

  public onCloseButtonClick(): void {
    this.dialogRef.close();
  }
}
