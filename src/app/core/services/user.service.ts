import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from '../../core/store/actions/user.actions';
import { AppState } from '../store/app.state';

export interface UserResponse {
  res: number,
  auth: boolean,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:5000/api/user/";

  constructor(
    private _http: HttpClient,
    private store: Store<AppState>
  ) { }

  avatar(data: FormData, token: string = ""): Observable<any> {
    return this._http.post<UserResponse>(this.url + "avatar", data, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
  }

  profile(token: string = ""): Observable<any> {
    return this._http.get<UserResponse>(this.url + "profile", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
  }

  setUser(token: string) {
    this.profile(token).subscribe((res: UserResponse) => {
      this.store.dispatch(new UserActions.SetUser({
        id: res.data.id,
        username: res.data.username,
        password: "",
        token: token,
        avatar: res.data.avatar,
        created_at: res.data.created_at,
        updated_at: res.data.updated_at
      }))
    })
  }
}
