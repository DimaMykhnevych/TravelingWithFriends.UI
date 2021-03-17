import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageModel } from 'src/app/core/models/message';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _http: HttpClient) {}

  public getChatMessages(chatId: number): Observable<IMessageModel[]> {
    return this._http.get<IMessageModel[]>(
      `${AppSettings.apiHost}/message/${chatId}`
    );
  }

  public postMessage(message: IMessageModel): Observable<IMessageModel> {
    return this._http.post<IMessageModel>(
      `${AppSettings.apiHost}/message`,
      message
    );
  }
}
