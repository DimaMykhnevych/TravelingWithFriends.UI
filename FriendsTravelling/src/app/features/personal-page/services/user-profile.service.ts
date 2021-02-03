import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfileUpdate } from 'src/app/layout/change-profile-dialog/models/profile-update.model';
import { AppSettings } from '../../../core/settings';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _http: HttpClient) {}

  public updateUserProfile(
    updatedUserInfo: IProfileUpdate
  ): Observable<IProfileUpdate> {
    return this._http.put<IProfileUpdate>(
      `${AppSettings.apiHost}/user`,
      updatedUserInfo
    );
  }
}
