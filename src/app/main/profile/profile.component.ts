import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/dtos/request/userDto.interface';
import { UserService } from 'src/app/providers/user.service';
import { NgForm } from '@angular/forms';
import { UserEditDto } from 'src/app/models/dtos/request/userEditDto.interface';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isEditable : Boolean = false

  firstname : string = ""
  lastname : string = ""
  email : string = ""
  picture : string = ""

  user! : UserDto // Editable user informations

  constructor(private userService : UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.userService.connectedUser

    this.firstname = this.user.firstname
    this.lastname = this.user.lastname
    this.email = this.user.email
    this.picture = this.user.picture
  }

  save(loginForm: NgForm) {
    
    var userEdit : UserEditDto = {
      id : this.user.id,
      email : this.email,
      firstname : this.firstname,
      lastname : this.lastname,
      picture : this.picture
    }
    
    this.userService.modifyUser(userEdit).pipe(first()).subscribe( {
      next : (response) => {
        this.user.firstname = response.firstname
        this.user.lastname = response.lastname
        this.user.email = response.email
        this.user.picture = response.picture
        this.isEditable = false
      }
    }
  )
  }

  edit(){
    this.isEditable = true
  }

  cancel(){


    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation : true,
    })

    dialogRef.componentInstance.title = "Cancel"
    dialogRef.componentInstance.text = "Confirm the cancellation of the changes in your user profile, the modified data will be lost."

    dialogRef.componentInstance.onResponse.subscribe((reponse) => {
      if(reponse){
        this.firstname = this.user.firstname
        this.lastname = this.user.lastname
        this.email = this.user.email
        this.picture = this.user.picture
        this.isEditable = false
      }
    })
  }
}
