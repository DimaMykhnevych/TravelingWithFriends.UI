import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddJourneyRequestModel } from 'src/app/core/models/add-journey-request';
import { IJourneyRequestModel } from 'src/app/core/models/journey-request';
import { IReviewJourneyRequestModel } from 'src/app/core/models/review-journey-request';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class JourneyRequestService {
  constructor(private _http: HttpClient) {}

  public getUserRequestsWithJourneys(
    userId: number
  ): Observable<IReviewJourneyRequestModel[]> {
    return this._http.get<IReviewJourneyRequestModel[]>(
      `${AppSettings.apiHost}/journeyRequest/requestsWithJourneys/${userId}`
    );
  }

  public getRequestByJourneyId(
    journeyId: number
  ): Observable<IJourneyRequestModel> {
    return this._http.get<IJourneyRequestModel>(
      `${AppSettings.apiHost}/journeyRequest/${journeyId}`
    );
  }

  public addJourneyRequest(
    request: IAddJourneyRequestModel
  ): Observable<IAddJourneyRequestModel> {
    return this._http.post<IAddJourneyRequestModel>(
      `${AppSettings.apiHost}/journeyRequest`,
      request
    );
  }
}
