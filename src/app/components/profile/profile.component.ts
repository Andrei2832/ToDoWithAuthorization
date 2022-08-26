import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { Event, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public myForm: FormGroup;
  public user: User = this.dataService.userNow;

  private usersSub: Subscription;
  public users: User[];

  constructor(
    private dataService: DataService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      UserSurname: new FormControl(this.user.surname, Validators.required),
      UserName: new FormControl(this.user.name, Validators.required),
      UsePatronymic: new FormControl(this.user.patronymic, Validators.required),
    });
    this.usersSub = this.localstorageService
      .getUsers()
      .subscribe((items: User[]) => (this.users = items));
  }

  public ngOnInit(): void {}

  public saveChange(): void {
    let surname: string = this.myForm.controls['UserSurname'].value;
    let name: string = this.myForm.controls['UserName'].value;
    let patronymic: string = this.myForm.controls['UsePatronymic'].value;

    this.users.map((items: User) => {
      if (items.login === this.user.login) {
        items.surname = surname;
        items.name = name;
        items.patronymic = patronymic;
        this.user = items;
        this.dataService.userNow = items;
      }
    });
    this.localstorageService.setUsers(this.users);
    this.router.navigate(['/main']);
  }

  public checkValue(e: KeyboardEvent): void {
    if (e.key.match(/[0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]/g)) {
      return e.preventDefault();
    }
  }
}
