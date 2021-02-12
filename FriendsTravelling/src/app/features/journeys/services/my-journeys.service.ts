import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJourneyModel } from 'src/app/core/models/journey';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class MyJourneysService {
  constructor(private _http: HttpClient) {}

  public getCurrentUserJourneys(): Observable<IJourneyModel[]> {
    let data = { isForCurrentUser: 'true' };
    return this._http.get<IJourneyModel[]>(`${AppSettings.apiHost}/journey`, {
      params: data,
    });
  }

  public deleteUserJourney(id: number): Observable<boolean> {
    return this._http.delete<boolean>(`${AppSettings.apiHost}/journey/${id}`);
  }
}
