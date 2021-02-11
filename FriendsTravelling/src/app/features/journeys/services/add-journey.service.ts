import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJourneyModel } from 'src/app/core/models/journey';
import { AppSettings } from 'src/app/core/settings';
import { IAddJourney } from '../models/add-journey';

@Injectable({
  providedIn: 'root',
})
export class AddJourneyService {
  constructor(private _http: HttpClient) {}

  public addJourney(journey: IAddJourney): Observable<IJourneyModel> {
    return this._http.post<IJourneyModel>(
      `${AppSettings.apiHost}/journey`,
      journey
    );
  }
}
