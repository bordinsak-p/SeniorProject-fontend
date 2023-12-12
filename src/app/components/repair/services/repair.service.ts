import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repair } from '../models/repair';
import { Equipments } from '../../equipment/models/equipments';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}

  mode$ = new BehaviorSubject<any>(null);
  // status$ = new BehaviorSubject<any>(false);
  repairStatus$ = new BehaviorSubject<any>(null);
  equipmentId$ = new BehaviorSubject<number>(null);
  repairId$ = new BehaviorSubject<number>(null);
  repairEquipment_pk$ = new BehaviorSubject<number>(null)

  constructor(private httpClient: HttpClient) { }

  getRepairs(params: any): Observable<Repair> {
    return this.httpClient.get<Repair>(`${environment.baseUrl}getRepairs`, { headers: this.headers, params })
  }

  addRepairs(paylaod: any, id: number): Observable<any> {    
    return this.httpClient.post(`${environment.baseUrl}addRepairs/${id}`, paylaod, {headers: this.headers });
  }

  delRepair(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseUrl}delRepairs/${id}`, { headers: this.headers})
  }

  delRepairs(ids: number[]): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseUrl}delRepairs`, { headers: this.headers, params: { ids: ids.join(',') } })
  }

  // equipment service
  getEquipment(params: any): Observable<Equipments[]>{
    return this.httpClient.get<Equipments[]>(`${environment.baseUrl}getEquipment`, { headers: this.headers, params })
  }

  getEquipmentForPrm(id: any): Observable<Equipments[]>{
    return this.httpClient.get<Equipments[]>(`${environment.baseUrl}getEquipmentForPrm/${id}`, { headers: this.headers})
  }

}
