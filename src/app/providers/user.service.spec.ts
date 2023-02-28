import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, inject, TestBed } from "@angular/core/testing";
import { UserDto } from "../models/dtos/request/userDto.interface";
import { UserService } from "./user.service";
import { environment } from 'src/environments/environment';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UserService]
      });
      service = TestBed.inject(UserService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should get users', () => {
      const dummyUsers = [{ id: 1, email: 'johndoe@gmail.com', firstname: 'John', lastname: 'Doe', picture: '', password: 'bibi' },
                          { id: 2, email: 'janedoe@gmail.com', firstname: 'Jane', lastname: 'Doe', picture: '', password: 'bobo' }];
  
      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });
  
      const req = httpMock.expectOne(`${environment.baseUrlAPI}${environment.usersEndPoint}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  
    it('should create a user', () => {
      const dummyUser = { id: 1, email: 'johndoe@gmail.com', firstname: 'John', lastname: 'Doe', picture: '', password: 'bibi' };
  
      service.createUser(dummyUser).subscribe(user => {
        expect(user).toEqual(dummyUser);
      });
  
      const req = httpMock.expectOne(`${environment.baseUrlAPI}${environment.usersEndPoint}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(dummyUser);
      req.flush(dummyUser);
    });
  });









// describe('UserService', ()=> {

//     let userService: UserService;
//     let httpClientSpy: jasmine.SpyObj<HttpClient>;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             // imports: [HttpClientTestingModule],
//             providers: [UserService]
//           });
//         // httpTestingController = TestBed.get(HttpTestingController);
//         httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
//         userService = new UserService(httpClientSpy);
//     })

//     // beforeEach(inject([UserService], (_userService: UserService) => userService = _userService));

//     // let httpTestingController: HttpTestingController;
//     // afterEach(() => {
//     //     httpTestingController.verify();
// });

    // it('should give users from API', fakeAsync(() => {
    //     const expectedUsers: UserDto[] = 
    //         [{}]

    //     userService.getUsers().subscribe(_users => users = _users);

    //     const req = httpTestingController.expectOne('https://functionapp-azurefunction.azurewebsites.net/api/users');

    //     req.flush({
    //         userNumber: 10
    //     });

    //     expect(users.).toEqual(10);
    // }));


