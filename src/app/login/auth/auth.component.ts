import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../providers/authentication.service';
import { concatWith, first } from 'rxjs';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(
    private router : Router,
    private authenticationService : AuthenticationService) {
    }

    ngOnInit(): void {
        const grantCode = new URLSearchParams(window.location.search).get("code")
    
        this.authenticationService.login(grantCode!)
        .pipe(first())
        .subscribe({
          next : (result) => {
            localStorage.setItem('token', JSON.stringify(result))
            this.router.navigateByUrl('main')
          },
          error : () => {
            console.log("error")
          }
        })
      }
}
