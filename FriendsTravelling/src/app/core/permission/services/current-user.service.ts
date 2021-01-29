import { Injectable } from '@angular/core';
import { IUserInfo } from '../../auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public userInfoChanged: Subject<void> = new Subject();

  private _userInfo: IUserInfo;

  constructor() {
    this._userInfo = {};
  }

  public get userInfo(): IUserInfo {
    return this._userInfo;
  }

  public set userInfo(info: IUserInfo) {
    this._userInfo = info;
    this.userInfoChanged.next();
  }

  public get isAdmin(): boolean {
    return this._userInfo.role === 'Admin';
  }
}
