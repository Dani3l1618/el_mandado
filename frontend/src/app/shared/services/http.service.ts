import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  public get<Response>(url: string): Observable<Response> {
    return this.http.get<Response>(url);
  }

  public post<Response, Body>(url: string, body: Body): Observable<Response> {
    return this.http.post<Response>(url, body);
  }
}
