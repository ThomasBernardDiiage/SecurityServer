import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { first } from 'rxjs';
import { UserDto } from 'src/app/models/dtos/request/userDto.interface';
import { UserPostDto } from 'src/app/models/dtos/request/userPostDto.interface';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
  providers : [UserService]
})
export class CreateUserDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userDialog: string,
    private formBuilder : FormBuilder,
    private userService : UserService
  ){}

  userForms = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    picture: ['', Validators.required],
  })

  onNewUser = new EventEmitter<UserDto>()


  onSubmit(){

    let user : UserPostDto = {
      email : this.userForms.controls.email.value ?? "",
      password : this.userForms.controls.password.value ?? "",
      firstname : this.userForms.controls.firstname.value ?? "",
      lastname : this.userForms.controls.lastname.value ?? "",
      picture : this.userForms.controls.picture.value ?? ""
    }

    this.userService.createUser(user).pipe(first()).subscribe( {
        next : (response) => {
          this.onNewUser.emit(response)
        }
      }
    )

    this.dialogRef.close()
  }
}
