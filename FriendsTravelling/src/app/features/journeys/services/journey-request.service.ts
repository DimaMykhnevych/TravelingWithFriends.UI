import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddJourneyRequestModel } from 'src/app/core/models/add-journey-request';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class JourneyRequestService {
  constructor(private _http: HttpClient) {}

  public addJourneyRequest(
    request: IAddJourneyRequestModel
  ): Observable<IAddJourneyRequestModel> {
    return this._http.post<IAddJourneyRequestModel>(
      `${AppSettings.apiHost}/journeyRequest`,
      request
    );
  }
}
