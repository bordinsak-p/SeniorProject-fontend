import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    register(userData: any) {
        return this.httpClient.post<any>(`${environment.baseUrl}register`, userData)
    }

    login(userData: any) {
        return this.httpClient.post<any>(`${environment.baseUrl}login`, userData)
    }
}
