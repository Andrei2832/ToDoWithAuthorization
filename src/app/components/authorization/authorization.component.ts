import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {LocalstorageService} from "../../services/localstorage.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public checkLoginANDPassword: boolean = true;

  constructor(
    private dataService: DataService,
    private localstorageService: LocalstorageService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public authorizationUser(login: HTMLInputElement, password: HTMLInputElement){
    if (!login.value.trim()){
      login.classList.add('underline-red')
    }
    if (!password.value.trim()){
      password.classList.add('underline-red')
    }
    if (login.value.trim() && password.value.trim()){
      let allUsers = this.dataService.users
      this.checkLoginANDPassword = allUsers.map((user) => {
        return user.login === login.value.trim() && user.password === password.value.trim()
      }).includes(true)

      if (this.checkLoginANDPassword){
        let userNow: UserModel = allUsers.find((user) => user.login === login.value.trim()) || new UserModel('','')
        this.localstorageService.setUserNow(userNow)
        this.router.navigate(['main'])
      }
    }
  }

  public inputChange(element: HTMLInputElement): void{
    element.classList.remove('underline-red')
  }
}
