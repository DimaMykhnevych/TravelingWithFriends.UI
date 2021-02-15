import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJourneyModel } from 'src/app/core/models/journey';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  constructor(private _http: HttpClient) {}

  public getJourneyById(id: number): Observable<IJourneyModel> {
    return this._http.get<IJourneyModel>(
      `${AppSettings.apiHost}/journey/${id}`
    );
  }

  public addJourney(journey: IJourneyModel): Observable<IJourneyModel> {
    return this._http.post<IJourneyModel>(
      `${AppSettings.apiHost}/journey`,
      journey
    );
  }

  public updateJourney(
    journeyId: number,
    journey: IJourneyModel
  ): Observable<IJourneyModel> {
    return this._http.put<IJourneyModel>(
      `${AppSettings.apiHost}/journey/${journeyId}`,
      journey
    );
  }
}
