import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {LocalstorageService} from "../../services/localstorage.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public myForm: FormGroup

  public showError: boolean = false;
  public textError: string;

  private usersSub: Subscription;
  public users: User[];

  constructor(
    private localstorageService: LocalstorageService,
    private dataService: DataService,
    private router: Router,
  ) {
    this.myForm = new FormGroup({
      userLogin: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^\s]+(\s+[^\s]+)*$')
      ]),
      userPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^\s]+(\s+[^\s]+)*$')
      ]),
      userRepeatPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^\s]+(\s+[^\s]+)*$')
      ]),
    })
    this.usersSub = this.localstorageService.getUsers().subscribe((items) => this.users = items)
  }

  public ngOnInit(): void {
  }

  public registration(login: string, password: string, repeatPassword: string): void{
    const minValuePassword: number = 6

    if (password === repeatPassword){
      if (password.length >= minValuePassword){
        if (password === repeatPassword){
          let UserExists = !!(this.users.find((user) => user.login === login));

          if (!UserExists) {
            let newUser = new User({
              login: login,
              password: password
            })
            this.users.push(newUser)
            this.localstorageService.setUsers(this.users)
            this.router.navigate(['/main'])
          }
          else{
            this.showError = true;
            this.textError = 'Логин уже используется'
          }
        }
      }else {
        this.showError = true;
        this.textError = 'Пароль меньше 6 символов'
      }
    }else {
      this.showError = true;
      this.textError = 'Пароли не совпадают'
    }


  }


}
