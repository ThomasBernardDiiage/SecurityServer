import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetApplicationsDto } from '../models/dtos/request/GetApplicationsDto.interface';
import { Application } from '../models/application.interface';
import { ApplicationPostDto } from '../models/dtos/request/applicationPostDto.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient){ 
  }

  getApps(): Observable<GetApplicationsDto[]>{
    return this.http.get<GetApplicationsDto[]>(environment.baseUrlAPI + environment.applicationsEndPoint)
  }

  createApplication(application : ApplicationPostDto): Observable<ApplicationPostDto>{
    return this.http.post<ApplicationPostDto>(environment.baseUrlAPI + environment.applicationsEndPoint, application)
  }
}
