// import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
// import { Observable } from 'rxjs';
// import { Application } from '../models/application.interface';
// import { ApplicationService } from '../providers/application.service';
// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LoginComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// describe('getApplications', () => {
//   let appService: ApplicationService;
//   let applications$: Observable<Application[]>;
//   beforeEach(() => applications$ = appService.getApps());

//   it('should give applications', fakeAsync(() => {
//       expect(applications$).toBeTrue();
//   }));
// });
