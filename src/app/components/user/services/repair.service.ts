import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Repairs } from '../models/repairs.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };

  equipmentId$ = new BehaviorSubject<any>(null);
  mode$ = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {}

  getUsers(params: any): Observable<Repairs[]> {
    return this.httpClient.get<Repairs[]>(`${environment.baseUrl}getUsers`, { headers: this.headers, params });
  }

  getUsersById(id: any): Observable<Repairs[]> {
    return this.httpClient.get<Repairs[]>(`${environment.baseUrl}getUsersForPms/${id}`, {headers: this.headers});
  }

  addUser(payload: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}addUsers`, payload, { headers: this.headers });
  }

  delUser(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}delUsers/${id}`, { headers: this.headers });
  }

  delUsers(id: number[]): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseUrl}delUsers`, { headers: this.headers, params: { id: id.join(',') } });
  }

}
