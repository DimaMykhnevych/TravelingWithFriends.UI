import { Injectable } from '@angular/core';
import { IMessageModel } from '../models/message';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import { AppSettings } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message: IMessageModel;
  messageReceived: Subject<IMessageModel>;
  private _hubConnection: HubConnection;
  constructor() {
    this.messageReceived = new Subject<IMessageModel>();
    this.createConnection();
    this.registerOnServerEvents();

    this.startConnection();
  }

  public onMessageRecieved(): Observable<IMessageModel> {
    return this.messageReceived.asObservable();
  }
  public disconnect() {
    this._hubConnection.stop();
  }
  public sendChatMessage(message: IMessageModel) {
    this._hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(AppSettings.hubHost + '/hubs/chat')
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

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (data) => {
      if (data) {
        this.message = data;
        this.messageReceived.next(data);
      }
    });
  }
}
