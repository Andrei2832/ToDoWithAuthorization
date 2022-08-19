import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {filter, map, Observable, Subscription} from "rxjs";
import {UserModel} from "../models/user.model";
import {LocalstorageService} from "./localstorage.service";
import {TasksUserModel} from "../models/tasksUser.model";

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit, OnDestroy{

  public usersSubscribe: Subscription;
  public userNowSubscribe: Subscription;
  public allTasksSubscribe: Subscription;
  public tasksUserSubscribe: Subscription;

  public users: UserModel[];
  public userNow: UserModel | '';
  public allTasks: TasksUserModel[];
  public tasksUser: TasksUserModel[];

  constructor(
    private localstorageService: LocalstorageService,
  ) {
    this.usersSubscribe = this.localstorageService.getUsers().subscribe((items) => this.users = items)
    this.userNowSubscribe = this.localstorageService.getUserNow().subscribe((items) => this.userNow = items)

    this.allTasksSubscribe = this.localstorageService.getTask().subscribe((items) => this.allTasks = items)
    this.tasksUserSubscribe = this.localstorageService.getTask().pipe(map((item) => {
      return item.filter((user) => this.userNow instanceof UserModel ? user._idUser === this.userNow?._id : '')
    }))
      .subscribe((items) => this.tasksUser = items)
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.usersSubscribe.unsubscribe()
    this.userNowSubscribe.unsubscribe()
    this.tasksUserSubscribe.unsubscribe()
  }

}
