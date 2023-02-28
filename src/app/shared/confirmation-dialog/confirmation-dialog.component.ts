import { Component, EventEmitter, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  providers : [UserService]
})
export class ConfirmationDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userDialog: string
  ){}

  onResponse = new EventEmitter<Boolean>()

  title = ""
  text = ""

  onConfirm(){
    this.onResponse.emit(true)
    this.dialogRef.close()
  }

  onCancel(){
    this.onResponse.emit(false)
    this.dialogRef.close()
  }
}
