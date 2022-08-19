import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {UserModel} from "../../models/user.model";
import {LocalstorageService} from "../../services/localstorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  public user: UserModel = this.dataService.userNow || new UserModel('','');

  constructor(
    private dataService: DataService,
    private localstorageService: LocalstorageService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
  }

  public saveChange(surname: string, name: string, patronymic: string): void{
    let allUsers = this.dataService.users
    allUsers.map((items) => {
      if (items.login === this.user.login){
        items.surname = surname;
        items.name = name;
        items.patronymic = patronymic;
        this.localstorageService.setUserNow(items)
        this.dataService.userNow = items
      }
    })
    this.localstorageService.setUsers(allUsers)
    this.router.navigate(['main'])
  }
}
