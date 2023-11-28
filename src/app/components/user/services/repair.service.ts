import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Repairs } from '../models/repairs.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}

  equipmentId$ = new BehaviorSubject<any>(null);
  mode$ = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<Repairs[]> {
    return this.httpClient.get<Repairs[]>(`${environment.baseUrl}getUsers`, { headers: this.headers })
  }
  
}
