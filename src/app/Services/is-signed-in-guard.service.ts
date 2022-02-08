import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtClientService } from './jwt-client.service';

@Injectable({
  providedIn: 'root',
})
export class IsSignedInGuardService implements CanActivate {
  constructor(private service: JwtClientService,private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    //check some condition
    //localStorage.getItem('Token')
    //if (this.service.giveValueofAccess()==0)  {
    if (localStorage.getItem('SignIn')=="false") {
      //alert('You are not allowed to view this page');
      this.router.navigate(['/FormSignIn']);
      return false;
    }
    return true;
  }
}
