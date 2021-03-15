import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChatModel } from 'src/app/core/models/chat';
import { AppSettings } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private _http: HttpClient) {}

  public getUserChats(userId: number): Observable<IChatModel[]> {
    return this._http.get<IChatModel[]>(
      `${AppSettings.apiHost}/chat/${userId}`
    );
  }
}
