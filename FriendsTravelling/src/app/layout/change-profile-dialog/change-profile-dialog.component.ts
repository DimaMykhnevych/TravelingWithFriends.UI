import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUserInfo } from 'src/app/core/auth';
import { ProfileImageService } from './services/profile-image.service';
import { HttpEventType } from '@angular/common/http';
import { IImage } from './models/image.model';
import { IDialogResult } from './models/dialog-result.model';

@Component({
  selector: 'app-change-profile-dialog',
  templateUrl: './change-profile-dialog.component.html',
  styleUrls: ['./change-profile-dialog.component.scss'],
})
export class ChangeProfileDialogComponent implements OnInit {
  public form: FormGroup = this._builder.group({});
  public imageUploadForm: FormGroup = this._builder.group({});
  public progress: number = 0;
  public message: string = null as any;

  private imageResponse: IImage = null as any;
  private dialogResult: IDialogResult = null as any;

  constructor(
    public dialogRef: MatDialogRef<ChangeProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userInfo: IUserInfo },
    private _builder: FormBuilder,
    private _imageService: ProfileImageService
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
    this.dialogResult = {
      mainForm: this.form.value,
      imageResponse: this.imageResponse,
    };
    this.dialogRef.close(this.dialogResult);
  }

  public uploadFile(file: HTMLInputElement) {
    let files = file.files || new FileList();
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();

    formData.append('file', fileToUpload, this.getUniqueFileName(fileToUpload));
    this._imageService.uploadProfileImage(formData).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        let total = event.total == undefined ? 100 : event.total;
        this.progress = Math.round((100 * event.loaded) / total);
      } else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.imageResponse = event.body == null ? (null as any) : event.body;
      }
    });
  }

  public onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  private getUniqueFileName(fileToUpload: File): string {
    let splitedFileNameWithFileFormat = fileToUpload.name
      .split('.')
      .filter((s) => s != '');
    let fileFormat =
      splitedFileNameWithFileFormat[splitedFileNameWithFileFormat.length - 1];
    splitedFileNameWithFileFormat.splice(-1, 1);

    let uniqueFileName =
      splitedFileNameWithFileFormat.join('.') +
      this.data.userInfo.userId +
      '.' +
      fileFormat;
    return uniqueFileName;
  }
}
