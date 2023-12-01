import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repair } from '../models/repair';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}

  mode$ = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  getRepairs(params: any): Observable<Repair> {
    return this.httpClient.get<Repair>(`${environment.baseUrl}getRepairs`, { headers: this.headers, params })
  }
}
