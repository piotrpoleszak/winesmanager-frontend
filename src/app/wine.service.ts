import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wine } from './wine';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class WineService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getWines(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/wine/all`);
  }

  public addWine(wine: Wine): Observable<Wine> {
    return this.http.post<Wine>(`${this.apiServerUrl}/wine/add`, wine)
  }

  public updateWine(wine: Wine): Observable<Wine> {
    return this.http.put<Wine>(`${this.apiServerUrl}/wine/update`, wine)
  }

  public deleteWine(wineId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/wine/delete/${wineId}`)
  }
}
