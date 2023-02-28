import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetApplicationsDto } from 'src/app/models/dtos/request/GetApplicationsDto.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-application-dialog.component.html',
  styleUrls: ['./delete-application-dialog.component.scss'],
})
export class DeleteApplicationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  appName: string = '';

  onYesClick(): void {
    if (this.data.applicationName === this.appName) {
      this.dialogRef.close(true);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
