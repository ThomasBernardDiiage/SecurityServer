import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { DetailsApplicationComponent } from './details-application.component';

describe('DetailsApplicationComponent', () => {
  let component: DetailsApplicationComponent;
  let fixture: ComponentFixture<DetailsApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientModule, MatDialogModule],
      declarations: [ DetailsApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //OK
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
