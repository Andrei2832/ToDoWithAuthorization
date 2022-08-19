import { Component, OnInit } from '@angular/core';
import {TasksUserModel} from "../../models/tasksUser.model";
import {UserModel} from "../../models/user.model";
import {DataService} from "../../services/data.service";
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: UserModel = this.dataService.userNow || new UserModel('','');
  public tasks: TasksUserModel[] = this.dataService.tasksUser || []

  constructor(
    private dataService: DataService,
    private localstorageService: LocalstorageService,
  ) {}

  public ngOnInit(): void {
  }

  public addTask(task: string): void{
    if (task.trim()){
      let newTask = new TasksUserModel(this.user.id, task, false)
      this.tasks.push(newTask)
      let allTask: TasksUserModel[] = this.dataService.allTasks
      allTask.push(newTask)
      this.localstorageService.setTask(allTask)
    }
  }
}
