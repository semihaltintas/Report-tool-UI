import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

constructor(private router: Router) { }
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

     if ( localStorage.getItem('token') ){
       // Token from the LogIn is avaiable, so the user can pass to the route
       return true
     } else  {
       // Token from the LogIn is not avaible because something went wrong or the user wants to go over the url to the site
       // Hands the user to the LogIn page
       this.router.navigate( ["/Login"] );
       return false

     }

}
}
