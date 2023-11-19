import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/shared/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.auth.checkTokenAndSetUser(); 
        return this.auth.isLoggedIn().pipe(
            map((loggedIn: boolean) => {
                if (loggedIn) {
                    return true;
                } else {
                    this.router.navigate(['/auth']);
                    return false;
                }
            })
        );
    }

}
