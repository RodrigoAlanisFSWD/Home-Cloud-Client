import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.model';

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
    private _http: HttpClient
  ) { }

  register(data: any): Observable<any> {
    return this._http.post<AuthResponse>(this.url + "register", {username: data.username, password: data.password})
  }

  login(data: any): Observable<any> {
    return this._http.post<AuthResponse>(this.url + "login", {username: data.username, password: data.password})
  }
}
