import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import { IReviewJourneyRequestModel } from '../models/review-journey-request';
import { AppSettings } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class JourneyRequestsService {
  public data: IReviewJourneyRequestModel[];
  requestsReceived: Subject<string>;
  private _hubConnection: HubConnection;

  public constructor() {
    this.requestsReceived = new Subject<string>();
    this.createConnection();
    this.registerOnServerEvents();

    this.startConnection();
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(AppSettings.hubHost + '/hubs/journeyRequest')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
      })
      .catch((err) => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection, 5000);
      });
  }
  public onRequestUpdate(): Observable<string> {
    return this.requestsReceived.asObservable();
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('requestsChanged', (data) => {
      this.data = data;
      this.requestsReceived.next(data);
    });
  }
}
