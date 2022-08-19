import { Component, OnInit } from '@angular/core';
import {Element} from "@angular/compiler";
import {UserModel} from "../../models/user.model";
import {LocalstorageService} from "../../services/localstorage.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public checkRepeatPassword: boolean = false;
  public checkExistsLogin: boolean = false;

  constructor(
    private localstorageService: LocalstorageService,
    private dataService: DataService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
  }


  public registration(login: HTMLInputElement, password: HTMLInputElement, repeatPassword: HTMLInputElement): void{
    this.checkExistsLogin = false

    if (!login.value.trim()){
      login.classList.add('underline-red')
    }
    if (!password.value.trim() || password.value.trim().length < 6){
      password.classList.add('underline-red')
    }
    this.checkRepeatPassword = !(password.value.trim() === repeatPassword.value.trim());

    if (login.value.trim() && password.value.trim() && repeatPassword.value.trim() && password.value.trim().length > 5){
      if (password.value.trim() === repeatPassword.value.trim()){
        let allUsers = this.dataService.users

        let checkExistsUser = !(allUsers.map((user) => {
          return user.login === login.value.trim();
        })).includes(true)

        if (checkExistsUser) {
          let newUser = new UserModel(login.value.trim(), password.value.trim())
          allUsers.push(newUser)
          this.localstorageService.setUsers(allUsers)
          this.router.navigate(['authorization'])
        }
        else{
          this.checkExistsLogin = true
        }
      }
    }
  }

  public inputChange(element: HTMLInputElement): void{
    element.classList.remove('underline-red')
  }
}
