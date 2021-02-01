import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../../core/settings';
import { RegistrationForm } from '../../../core/auth';

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {}

  public create(user: RegistrationForm): Observable<any> {
    return this._http.post<any>(`${AppSettings.apiHost}/user`, user);
  }
}
