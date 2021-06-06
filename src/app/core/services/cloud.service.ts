import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types/item.model';

export interface CloudResponse {
  res: number,
  auth: boolean,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  url = "http://localhost:5000/api/cloud/";

  constructor(
    private _http: HttpClient,
  ) { }

  getItems(path: string = "-"): Observable<any> {
    return this._http.get<CloudResponse>(this.url + "read/" + path)
  }

  upload(data: FormData, path: string = "-"): Observable<any> {
    return this._http.post<CloudResponse>(this.url + "upload/" + path, data)
  }

  delete(item: Item, path: string = "-", type: string): Observable<any> {
    return this._http.delete<CloudResponse>(this.url + "rm/" + item.name + "/" + type + "/" + path)
  }

  mkdir(name: string, path: string = "-"): Observable<any> {
    return this._http.post<CloudResponse>(this.url + "mkdir/" + path, {
      name
    })
  }

  download(item: Item, path: string = "-"): Observable<any> {
    return this._http.get(this.url + "download/" + item.name + "/" + path, {
      responseType: "arraybuffer"
    })
  }

}
