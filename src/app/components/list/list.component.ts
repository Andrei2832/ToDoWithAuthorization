import {Component, Input, OnInit} from '@angular/core';
import {TasksUserModel} from "../../models/tasksUser.model";
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() tasks: TasksUserModel[];
  @Input() allTasks: TasksUserModel[];

  constructor(
    private localstorageService: LocalstorageService,
  ) {
  }

  public ngOnInit(): void {
  }

  public onDelete(task: TasksUserModel): void{
    let index = this.tasks.indexOf(task)
    this.tasks.splice(index,1)

    let indexAll = this.allTasks.indexOf(task)
    this.allTasks.splice(indexAll,1)

    this.localstorageService.setTask(this.allTasks)
  }

  public onCheckbox(task: TasksUserModel): void{
    let indexAll = this.allTasks.findIndex((item) => item.id === task.id)
    this.allTasks[indexAll].completed = !task.completed;

    task.completed = !task.completed

    this.localstorageService.setTask(this.allTasks)
  }

  public changeTextTask(task: TasksUserModel, text: HTMLDivElement){
    if (text.textContent){
      let indexAll = this.allTasks.findIndex((item) => item.id === task.id)
      this.allTasks[indexAll].text = text.textContent;

      task.text = text.textContent;

      this.localstorageService.setTask(this.allTasks)
    }else {
      this.onDelete(task)
    }
  }
}
