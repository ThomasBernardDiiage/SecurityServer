import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { ApplicationComponent } from './application.component';

describe('ApplicationComponent', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientModule, MatDialogModule],
      declarations: [ ApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //OK
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`should have as title 'frontend'`, () => {
  //   expect(component.).toEqual('frontend');
  // });

  // it('', () => {
  //   expect()
  // });
});
