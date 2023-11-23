import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipments } from '../constants/equipments';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}
  
  constructor(private httpClient: HttpClient) { }
  
  getEquipment(params: any): Observable<Equipments[]>{
    return this.httpClient.get<Equipments[]>(`${environment.baseUrl}getEquipment`, { headers: this.headers, params })
  }
}
