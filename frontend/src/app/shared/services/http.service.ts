import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly commonHeader = {
    'ngrok-skip-browser-warning': 'true',
  };

  public get<Response>(url: string): Observable<Response> {
    const headers = new HttpHeaders(this.commonHeader);
    return this.http.get<Response>(url, { headers });
  }

  public post<Response, Body>(url: string, body: Body): Observable<Response> {
    const headers = new HttpHeaders(this.commonHeader);
    return this.http.post<Response>(url, body, { headers });
  }
}
