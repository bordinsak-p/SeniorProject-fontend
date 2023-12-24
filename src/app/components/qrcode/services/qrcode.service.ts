import { Injectable } from '@angular/core';
import { Equipments } from '../models/equipments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  private headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}

  constructor(private httpClient: HttpClient) { }

  getEquipment(params: any): Observable<Equipments[]>{
    return this.httpClient.get<Equipments[]>(`${environment.baseUrl}getEquipment`, { headers: this.headers, params })
  }

  getEquipmentForPrm(id: any): Observable<Equipments[]>{
    return this.httpClient.get<Equipments[]>(`${environment.baseUrl}getEquipmentForPrm/${id}`, { headers: this.headers })
  }
}
