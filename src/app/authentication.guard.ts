import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './providers/AuthGuard/auth-guard.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authGuardService: AuthGuardService, private router: Router){}

  canActivate() : boolean
  {
    if(!this.authGuardService.gettoken())
    {
      this.router.navigateByUrl("unauthorized");
    }
    return this.authGuardService.gettoken();
  }
}
