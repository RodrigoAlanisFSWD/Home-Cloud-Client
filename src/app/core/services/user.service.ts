import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserResponse {
  res: number,
  auth: boolean,
  data: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:5000/api/user/";

  constructor(
    private _http: HttpClient
  ) { }

  avatar(data: FormData, token: string): Observable<any> {
    return this._http.post<UserResponse>(this.url + "avatar", data, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
  }
}
