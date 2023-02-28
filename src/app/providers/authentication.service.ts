import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.interface';
import { environment } from '../../environments/environment';
import { AuthenticationDto } from '../models/dtos/request/AuthenticationDto.interface';
import { AuthenticationResponseBaseDto } from '../models/dtos/response/AuthenticationResponseDto.interface';
import { map, Observable } from 'rxjs';
import { GrantResponseDto } from '../models/dtos/response/GrantResponseDto.interface';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  grant(email : string, password : string, secret : string) : Observable<GrantResponseDto>{
    let body : AuthenticationDto = {
      email : email,
      password : password,
      secret : secret
    }

    return this.http.post<GrantResponseDto>(environment.baseUrlAPI + environment.grantEndPoint, body)
      .pipe(map(response => {
        return response
      }))
  }

  login(grant : string) : Observable<AuthenticationResponseBaseDto> {
    return this.http.get<AuthenticationResponseBaseDto>(environment.baseUrlAPI + environment.authenticationEndPoint + "?code=" + grant)
    .pipe(map(reponse => {

      if(reponse.success){
        console.log("Login success !")
      }
      else{
        localStorage.clear()
      }

      return reponse
    }))
  }
}
