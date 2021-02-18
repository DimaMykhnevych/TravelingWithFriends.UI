import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppUserModel } from 'src/app/core/models/app-user';
import { IProfileUpdate } from 'src/app/layout/change-profile-dialog/models/profile-update.model';
import { AppSettings } from '../../../core/settings';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _http: HttpClient) {}

  public getUserById(id: number): Observable<IAppUserModel> {
    return this._http.get<IAppUserModel>(`${AppSettings.apiHost}/user/${id}`);
  }

  public getCurrentlyLoggedInUser(): Observable<IAppUserModel> {
    return this._http.get<IAppUserModel>(`${AppSettings.apiHost}/user/${0}`);
  }

  public updateUserProfile(
    updatedUserInfo: IProfileUpdate
  ): Observable<IProfileUpdate> {
    return this._http.put<IProfileUpdate>(
      `${AppSettings.apiHost}/user`,
      updatedUserInfo
    );
  }
}
