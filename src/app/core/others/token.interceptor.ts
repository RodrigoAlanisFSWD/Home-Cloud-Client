import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'any'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _auth: AuthService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._auth.getToken();
    console.log(token);

    const headers = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token
      }
    });

    return next.handle(headers)
  }
}
