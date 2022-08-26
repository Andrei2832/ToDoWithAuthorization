import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, of } from 'rxjs';
import { TasksUserModel } from '../models/tasksUser.model';
import { IUser } from '../interfaces/user.interface';
import { ITasksUser } from '../interfaces/tasks-user.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  public getUsers(): Observable<User[]> {
    const localStorageData: string = localStorage.getItem('users') || '';
    return of(!!localStorageData ? JSON.parse(localStorageData) : []).pipe(
      map((data: IUser[]) => data.map((user: IUser) => new User(user)))
    );
  }

  public setUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getTask(): Observable<TasksUserModel[]> {
    const localStorageData: string = localStorage.getItem('tasksUser') || '';
    return of(!!localStorageData ? JSON.parse(localStorageData) : []).pipe(
      map((data: ITasksUser[]) =>
        data.map((task: ITasksUser) => new TasksUserModel(task))
      )
    );
  }

  public setTask(tasksUser: TasksUserModel[]): void {
    localStorage.setItem('tasksUser', JSON.stringify(tasksUser));
  }
}
