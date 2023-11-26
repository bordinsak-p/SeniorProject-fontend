import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipments } from '../models/equipments';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}

  equipmentId$ = new BehaviorSubject<any>(null);
  mode$ = new BehaviorSubject<any>(null);
  
  constructor(private httpClient: HttpClient) { }
  
  set setEquipmentId(equipmentId: any) {
    this.equipmentId$ = equipmentId
  }

  get getEquiptmentId() {
    return this.equipmentId$
  }

  getEquipment(params: any): Observable<Equipments[]>{
    return this.httpClient.get<Equipments[]>(`${environment.baseUrl}getEquipment`, { headers: this.headers, params })
  }

  getEquipmentForPrm(id: any): Observable<Equipments[]>{
    return this.httpClient.get<Equipments[]>(`${environment.baseUrl}getEquipmentForPrm/${id}`, { headers: this.headers})
  }

  addEquipment(paylaod: any): Observable<any> {    
    return this.httpClient.post(`${environment.baseUrl}addEquipment`, paylaod, {headers: this.headers });
  }
  
  updateEquipment(id: number, equipment: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.baseUrl}editEquipment/${id}`, equipment, {headers: this.headers});
  }

  delEquipment(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseUrl}delEquipment/${id}`, { headers: this.headers})
  }

  delEquipments(ids: number[]): Observable<any> {
    return this.httpClient.delete<any>(`${environment.baseUrl}delEquipments`, { headers: this.headers, params: { ids: ids.join(',') } })
  }
}
