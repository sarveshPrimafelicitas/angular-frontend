import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  http = inject(HttpClient);

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(endpoint, data);
  }

  getData(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }

  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(endpoint);
  }
}
