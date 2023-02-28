import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserDto } from '../models/dtos/request/userDto.interface';
import { UserPostDto } from '../models/dtos/request/userPostDto.interface';
import { UserEditDto } from '../models/dtos/request/userEditDto.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){ 
  }

  connectedUser! : UserDto
  isAdmin : Boolean = this.getRole()

  private getRole() : Boolean{
    const token : any = JSON.parse(localStorage.getItem('token')!)

    const [header, payload, signature] = token.token.token.split(".")
    const decodedPayload : string[] = JSON.parse(atob(payload)).roles

    console.log(decodedPayload);

    return decodedPayload.includes("Admin")
  }

  getUsers(): Observable<UserDto[]>{
    return this.http.get<UserDto[]>(environment.baseUrlAPI + environment.usersEndPoint)
  }

  createUser(user : UserPostDto) : Observable<UserDto>{
    return this.http.post<UserDto>(environment.baseUrlAPI + environment.usersEndPoint, user)
  }

  deleteUser(id : Number) : Observable<Boolean> {
    var isDeleted = this.http.delete<Boolean>(environment.baseUrlAPI + environment.usersEndPoint + "/" + id)
    return isDeleted
  }

  modifyUser(user : UserEditDto) : Observable<UserDto>{
    return this.http.patch<UserDto>(environment.baseUrlAPI + environment.usersEndPoint, user)
  }

  getAuthUser() : Observable<UserDto> {
    return this.http.get<UserDto>(environment.baseUrlAPI + environment.usersEndPoint + '/' + environment.authUserEndpoint)
  }
}
