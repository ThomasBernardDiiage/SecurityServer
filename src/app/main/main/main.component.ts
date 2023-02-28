import { Component, OnInit } from '@angular/core';
import MenuItem from '../../models/menu-item.interface';
import { UserService } from 'src/app/providers/user.service';
import { UserDto } from 'src/app/models/dtos/request/userDto.interface';

@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  menuItems : MenuItem[]
  connectedUser! : UserDto

  constructor(private userService : UserService) {

    const menuUser : MenuItem = {
      name : "Users",
      image : "fas fa-user-friends",
      path : "user",
      isSelected : false
    }

    const menuApplication : MenuItem = {
      name : "Applications",
      image : "fa-solid fa-boxes-stacked",
      path : "application",
      isSelected : false
    }

    const menuProfile : MenuItem = {
      name : "Profile",
      image : "fas fa-user",
      path : "profile",
      isSelected : false
    }

    const menuSetting : MenuItem = {
      name : "Settings",
      image : "fa-solid fa-gear",
      path : "setting",
      isSelected : false
    }

    const menuInformation : MenuItem = {
      name : "Informations",
      image : "fa-solid fa-circle-info",
      path : "information",
      isSelected : false
    }

    this.menuItems = [menuUser, menuApplication, menuProfile, menuSetting, menuInformation]

  }

  ngOnInit(): void {
    this.userService.getAuthUser().subscribe({
      next : (result) => {
        this.connectedUser = result
        this.userService.connectedUser = this.connectedUser
      },
      error : () => {
        console.log("error")
      }
    })
  }

  onMenuItemClick(menuItem : MenuItem){
    this.menuItems.forEach(x => x.isSelected = false)
    menuItem.isSelected = true;
  }

  onLogout(){
    localStorage.clear()
  }

}
