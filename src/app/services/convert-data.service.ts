import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {TasksUserModel} from "../models/tasksUser.model";

@Injectable({
  providedIn: 'root'
})
export class ConvertDataService {

  constructor() { }

  public convertUsers(data: Observable<UserModel[]>): Observable<UserModel[]>{
    return data.pipe(
      map((item) => {
        return item.map((user) => {
          return new UserModel(user._login, user._password, user._surname, user._name, user._patronymic, user._id)
        })
    }
    ))
  }

  public convertUserNow(data: Observable<UserModel>): Observable<UserModel>{
    return data.pipe(map((user) => {
      return new UserModel(user._login, user._password, user._surname, user._name, user._patronymic, user._id)
    }))
  }

  public convertTasksUsers(data: Observable<TasksUserModel[]>): Observable<TasksUserModel[]>{
    return data.pipe(map((items) => {
      return items.map((user) => {
        return new TasksUserModel(user._idUser, user._text, user._completed, user._id)
      })
    }))
  }
}
