import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getEVData(): Observable<string> {
    return this.http.get('assets/Electric_Vehicle_Population_Data.csv', {
      responseType: 'text',
    });
  }
}
