import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


// export class LoginGuardGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }


// }

export const LogginGuard = () => {
    const router = inject(Router)
    if (localStorage.getItem('TokenJWT')){
      return true;
    } else {
        // RETORMANOS A LA PAGINA QUE QUERAMOS
        router.navigate(['loggin']);
      return false;
    }
}
