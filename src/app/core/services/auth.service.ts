import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface AuthResponse {
  res: number
  auth: boolean
  token: string
  refresh: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:5000/api/auth/";

  constructor(
    private _http: HttpClient,
    private _cookie: CookieService
  ) { }

  register(data: any): Observable<any> {
    return this._http.post<AuthResponse>(this.url + "register", {username: data.username, password: data.password})
  }

  login(data: any): Observable<any> {
    return this._http.post<AuthResponse>(this.url + "login", {username: data.username, password: data.password})
  }

  refresh(refresh: string): Observable<any> {
    return this._http.get<AuthResponse>(this.url + "refresh", {
      headers: {
        "Authorization": "Bearer " + refresh
      }
    })
  }

  getToken(): string {
    return this._cookie.get("cloud-token")
  }

  getRefresh(): string {
    return this._cookie.get("cloud-refresh")
  }
}
