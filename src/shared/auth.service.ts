import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn$ = new BehaviorSubject<boolean>(false);
    private userData$ = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {}

    // login(credentials: { email: string, password: string }): Observable<any> {
    //   return this.http.post(`${environment.baseUrl}login`, credentials).pipe(
    //     tap((response: any) => {
    //       if (response.success) {
    //         const token = response.token;
    //         localStorage.setItem('token', token);
    //         const decodedToken = jwtDecode(token);
    //         this.userData$.next(decodedToken);
    //         this.loggedIn$.next(true);
    //       }
    //     })
    //   );
    // }

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${environment.baseUrl}login`, credentials).pipe(
            tap((response: any) => {
                if (response.success) {
                    const token = response.token;
                    localStorage.setItem('token', token);
                    this.decodeAndSetUserData(token);
                }
            })
        );
    }

    private decodeAndSetUserData(token: string): void {
        const decodedToken = jwtDecode(token);
        this.userData$.next(decodedToken);
        this.loggedIn$.next(true);
    }

    checkTokenAndSetUser(): void {
        const token = localStorage.getItem('token');
        if (token) {
            this.decodeAndSetUserData(token);
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        this.userData$.next(null);
        this.loggedIn$.next(false);
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn$.asObservable();
    }

    getUserData(): Observable<any> {
        return this.userData$.asObservable();
    }
}
