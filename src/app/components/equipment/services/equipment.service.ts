import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}
  
  constructor(private httpClient: HttpClient) { }
  
  getEquipment(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${environment.baseUrl}getEquipment`, { headers: this.headers })
  }
}
