import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { UserDto } from 'src/app/models/dtos/request/userDto.interface';
import { UserService } from 'src/app/providers/user.service';
import { CreateUserDialogComponent } from 'src/app/shared/create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users! : UserDto[]
  selectedUser? : UserDto

  constructor(private userService : UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(result => {
      this.users = result.filter(x => x.id != this.userService.connectedUser.id)
    })

    this.dialog.afterAllClosed.subscribe(() => {
    })
  }

  createUser(){
    let dialogRef = this.dialog.open(CreateUserDialogComponent, {
      closeOnNavigation : true,

    })

    dialogRef.componentInstance.onNewUser.subscribe((user) => {
      this.users.push(user)
    })
  }

  onUserClick(user : UserDto){
    this.selectedUser = user
  }

  deleteUser(){
    console.log(this.selectedUser?.id)
    this.userService.deleteUser(this.selectedUser!.id).pipe(

    )
    .subscribe(x => {
      this.users = this.users.filter(x => x.id != this.selectedUser?.id)
      this.selectedUser = undefined
    })
  }

}
