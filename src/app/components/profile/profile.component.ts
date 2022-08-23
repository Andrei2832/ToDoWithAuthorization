import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";
import {LocalstorageService} from "../../services/localstorage.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User = this.dataService.userNow;

  private usersSub: Subscription;
  public users: User[];

  constructor(
    private dataService: DataService,
    private localstorageService: LocalstorageService,
    private router: Router,
  ) {
    this.usersSub = this.localstorageService.getUsers().subscribe((items) => this.users = items)
  }

  public ngOnInit(): void {
  }

  public saveChange(surname: string, name: string, patronymic: string): void{
    this.users.map((items) => {
      if (items.login === this.user.login){
        items.surname = surname;
        items.name = name;
        items.patronymic = patronymic;
        this.dataService.userNow = items
      }
    })
    this.localstorageService.setUsers(this.users)
    this.router.navigate(['/main'])
  }
}
