import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToHttpParams } from 'src/app/core/http';
import { IJourneyModel } from 'src/app/core/models/journey';
import { ISearchJourneyModel } from 'src/app/core/models/search-journey';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class MyJourneysService {
  constructor(private _http: HttpClient) {}

  public getCurrentUserJourneys(
    params: ISearchJourneyModel
  ): Observable<IJourneyModel[]> {
    const parameters: HttpParams = convertToHttpParams<ISearchJourneyModel>(
      params
    );
    return this._http.get<IJourneyModel[]>(`${AppSettings.apiHost}/journey`, {
      params: parameters,
    });
  }

  public deleteUserJourney(id: number): Observable<boolean> {
    return this._http.delete<boolean>(`${AppSettings.apiHost}/journey/${id}`);
  }
}
