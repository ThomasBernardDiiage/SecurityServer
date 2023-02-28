import { Component, EventEmitter, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Application } from 'src/app/models/application.interface';
import { ApplicationService } from 'src/app/providers/application.service';
import { Claim } from '../../models/claim.interface';
import { ApplicationPostDto } from 'src/app/models/dtos/request/applicationPostDto.interface';

@Component({
  selector: 'app-create-application-dialog',
  templateUrl: './create-application-dialog.component.html',
  styleUrls: ['./create-application-dialog.component.scss'],
  providers: [ApplicationService],
})
export class CreateApplicationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public applicationName: string,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService
  ) {}

  onNewApplication = new EventEmitter<ApplicationPostDto>();

  applicationForms = this.formBuilder.group({
    applicationName: [''],
    applicationUri: [''],
    values: this.formBuilder.array([this.formBuilder.control('')]),
    types: this.formBuilder.array([this.formBuilder.control('String')]),
  });

  addClaim() {
    this.applicationForms.controls.values.push(this.formBuilder.control(''));
    this.applicationForms.controls.types.push(
      this.formBuilder.control('String')
    );
  }

  onSubmit() {
    let claims: Claim[] = [];

    for (
      let i = 0;
      i < this.applicationForms.controls.values.value.length;
      i++
    ) {
      claims.push({
        value: this.applicationForms.controls.values.value[i] ?? '',
        type: this.applicationForms.controls.types.value[i] ?? '',
      });
    }

    const application: ApplicationPostDto = {
      id: 0,
      applicationName:
        this.applicationForms.controls.applicationName.value ?? '',
      applicationSecret: '',
      applicationClaims: claims,
      applicationUri: this.applicationForms.controls.applicationUri.value ?? '',
    };
    this.applicationService
      .createApplication(application)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.onNewApplication.emit(response);
        },
      });

    this.dialogRef.close();
  }
}
