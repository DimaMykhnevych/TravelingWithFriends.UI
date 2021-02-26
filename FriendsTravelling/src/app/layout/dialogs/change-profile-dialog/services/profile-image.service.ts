import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../../../core/settings';
import { IImage } from '../models/image.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  constructor(private _http: HttpClient) {}

  public uploadProfileImage(formData: FormData): Observable<HttpEvent<IImage>> {
    return this._http.post<IImage>(`${AppSettings.apiHost}/Image`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
