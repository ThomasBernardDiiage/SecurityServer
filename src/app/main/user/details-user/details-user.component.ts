import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UserDto } from 'src/app/models/dtos/request/userDto.interface';
import { UserService } from 'src/app/providers/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { UserEditDto } from 'src/app/models/dtos/request/userEditDto.interface';
import { first } from 'rxjs';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit, OnChanges {

  constructor(private userService : UserService, public dialog: MatDialog) { }
  @Output() onDeleteUserEventEmitter = new EventEmitter<Number>();

  isEditMode : Boolean = false
  isAdmin : Boolean = false

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditMode = false
  }

  picture = ""
  firstname = ""
  lastname = ""
  email = ""


  @Input()
  selectedUser!: UserDto


  onDeleteUser(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation : true,
    })

    dialogRef.componentInstance.title = "Delete"
    dialogRef.componentInstance.text = "Do you confirm the deletion of this user ?"

    dialogRef.componentInstance.onResponse.subscribe((reponse) => {
      if(reponse){
        this.onDeleteUserEventEmitter.emit(this.selectedUser.id)
      }
    })
  }

  onEditUser(){
    this.isEditMode = true

    this.picture = this.selectedUser.picture
    this.firstname = this.selectedUser.firstname
    this.lastname = this.selectedUser.lastname
    this.email = this.selectedUser.email
  }

  onCancel(){

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation : true,
    })

    dialogRef.componentInstance.title = "Cancel"
    dialogRef.componentInstance.text = "Confirm the cancellation of the changes in this user profile, the modified data will be lost."

    dialogRef.componentInstance.onResponse.subscribe((reponse) => {
      if(reponse){
        this.isEditMode = false
        this.picture = this.selectedUser.picture
        this.firstname = this.selectedUser.firstname
        this.lastname = this.selectedUser.lastname
        this.email = this.selectedUser.email
      }
    })
  }

  onSave(){

    var userEdit : UserEditDto = {
      id : this.selectedUser.id,
      email : this.email,
      firstname : this.firstname,
      lastname : this.lastname,
      picture : this.picture
    }
    
    this.userService.modifyUser(userEdit).pipe(first()).subscribe( {
      next : (response) => {
        this.selectedUser.firstname = response.firstname
        this.selectedUser.lastname = response.lastname
        this.selectedUser.email = response.email
        this.selectedUser.picture = response.picture
        this.isEditMode = false
      }
    })
  }
}
