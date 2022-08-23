import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {Observable, of} from "rxjs";
import {ConvertDataService} from "./convert-data.service";
import {TasksUserModel} from "../models/tasksUser.model";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(
    private convertDataService: ConvertDataService,
  ) { }

  public getUsers(): Observable<User[]>{
    const localStorageData: string = localStorage.getItem('users') || '';
    return this.convertDataService.convertUsers(of(!!localStorageData ? JSON.parse(localStorageData) : []))
  }
  public setUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getTask(): Observable<TasksUserModel[]>{
    const localStorageData: string = localStorage.getItem('tasksUser') || '';
    return this.convertDataService.convertTasksUsers(of(!!localStorageData ? JSON.parse(localStorageData) : []))
  }
  public setTask(tasksUser: TasksUserModel[]): void {
    localStorage.setItem('tasksUser', JSON.stringify(tasksUser));
  }

  public deleteDataLocalStorage(): void{
    localStorage.removeItem('users');
  }
}
