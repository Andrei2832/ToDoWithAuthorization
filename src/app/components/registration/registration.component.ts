import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public myForm: FormGroup;

  public showError: boolean = false;
  public textError: string;

  private usersSub: Subscription;
  public users: User[];

  constructor(
    private localstorageService: LocalstorageService,
    private dataService: DataService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      userLogin: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
      userRepeatPassword: new FormControl('', [Validators.required]),
    });
    this.usersSub = this.localstorageService
      .getUsers()
      .subscribe((items) => (this.users = items));
  }

  public ngOnInit(): void {}

  public registration(): void {
    let login = this.myForm.controls['userLogin'].value;
    let password = this.myForm.controls['userPassword'].value;
    let repeatPassword = this.myForm.controls['userRepeatPassword'].value;

    const minValuePassword: number = 6;

    if (password !== repeatPassword) {
      this.showError = true;
      this.textError = 'Пароли не совпадают';
      return;
    }
    if (password.length < minValuePassword) {
      this.showError = true;
      this.textError = 'Пароль меньше 6 символов';
      return;
    }

    let UserExists = !!this.users.find((user) => user.login === login);

    if (UserExists) {
      this.showError = true;
      this.textError = 'Логин уже используется';
      return;
    }

    let newUser = new User({
      _login: login,
      _password: password,
    });
    this.users.push(newUser);
    this.localstorageService.setUsers(this.users);
    this.dataService.userNow = newUser;
    this.router.navigate(['/main']);
  }
}
