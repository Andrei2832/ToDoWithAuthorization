import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {LocalstorageService} from "../../services/localstorage.service";
import {User} from "../../models/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit,OnDestroy {
  public myForm: FormGroup
  public showError: boolean = false;
  public textError: string;

  private usersSub: Subscription;
  public users: User[];

  constructor(
    private dataService: DataService,
    private localstorageService: LocalstorageService,
    private router: Router,
  ) {
    this.myForm = new FormGroup({
      userLogin: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
    })
    this.usersSub = this.localstorageService.getUsers().subscribe((items) => this.users = items)
  }

  public ngOnInit(): void {
  }

  public authorizationUser(login: string, password: string){
      let userSearch = this.users.find((user) => user.login === login && user.password === password)

      if (!!userSearch){
        this.dataService.userNow = userSearch
        this.router.navigate(['main'])
      }
      else {
        this.showError = true;
        this.textError = 'Логин или пароль не верны'
      }

  }

  public ngOnDestroy(): void {
    this.usersSub.unsubscribe()
  }
}
