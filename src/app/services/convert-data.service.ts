import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../models/user.model";
import {TasksUserModel} from "../models/tasksUser.model";

@Injectable({
  providedIn: 'root'
})
export class ConvertDataService {

  constructor() { }

  public convertUsers(data: Observable<User[]>): Observable<User[]>{
    return data.pipe(
      map((item) => {
        return item.map((user) => {
          return new User({
            id: user._id,
            login: user._login,
            password: user._password,
            surname: user._surname,
            name: user._name,
            patronymic: user._patronymic,
          })
        })
    }
    ))
  }

  public convertUserNow(data: Observable<User>): Observable<User>{
    return data.pipe(map((user) => {
      return new User({
        id: user._id,
        login: user._login,
        password: user._password,
        surname: user._surname,
        name: user._name,
        patronymic: user._patronymic,
      })
    }))
  }

  public convertTasksUsers(data: Observable<TasksUserModel[]>): Observable<TasksUserModel[]>{
    return data.pipe(map((items) => {
      return items.map((user) => {
        return new TasksUserModel({
          id: user._id,
          idUser: user._idUser,
          text: user._text,
          completed: user._completed
        })
      })
    }))
  }
}
