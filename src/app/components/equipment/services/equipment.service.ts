import { HttpClient } from '@angular/common/http';
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

  addEquipment(paylaod: any): Observable<any> {    
    return this.httpClient.post(`${environment.baseUrl}addEquipment`, paylaod, {headers: this.headers });
  }
  
  // updateProductPms(id: number, product: any): Observable<any> {
  //   return this.http.put<any>(`${environment.baseUrl}updateProductPms/${id}`, product);
  // }


  // deleteProduct(id: number): Observable<any> {
  //   return this.http.delete<any>(`${environment.baseUrl}deleteProductPms/${id}`)
  // }
}
