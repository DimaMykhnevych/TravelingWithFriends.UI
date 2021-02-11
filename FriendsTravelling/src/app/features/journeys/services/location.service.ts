import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private _http: HttpClient) {}

  public getCoordinatesByLocationName(location: string): Observable<any> {
    return this._http.get<any>(`http://api.positionstack.com/v1/forward`, {
      params: {
        access_key: '75e41ddcd044eb1b18eb8fdfe17097b5',
        query: location,
      },
    });
    // return this._http.get<any>(`https://geocode.xyz`, {
    //   params: {
    //     auth: '540871093963893757578x75879',
    //     locate: location,
    //     json: '1',
    //   },
    // });
  }
}
