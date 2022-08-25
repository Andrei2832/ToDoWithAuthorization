import { Component, Input, OnInit } from '@angular/core';
import { TasksUserModel } from '../../models/tasksUser.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { map, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public myForm: FormGroup;
  public user: User = this.dataService.userNow;

  public tasksAllSub: Subscription;
  public tasksAll: TasksUserModel[];

  public tasksUserSub: Subscription;
  public tasksUser: TasksUserModel[];

  constructor(
    private localstorageService: LocalstorageService,
    private dataService: DataService
  ) {
    this.myForm = new FormGroup({
      textTask: new FormControl('', Validators.required),
    });

    this.tasksAllSub = this.localstorageService
      .getTask()
      .subscribe((tasks: TasksUserModel[]) => (this.tasksAll = tasks));

    this.tasksUserSub = this.localstorageService
      .getTask()
      .pipe(
        map((item: TasksUserModel[]) =>
          item.filter((user: TasksUserModel) => user.idUser === this.user.id)
        )
      )
      .subscribe((tasks: TasksUserModel[]) => (this.tasksUser = tasks));
  }

  public ngOnInit(): void {}

  public onDelete(task: TasksUserModel): void {
    let index = this.tasksUser.indexOf(task);
    this.tasksUser.splice(index, 1);

    let indexAll = this.tasksAll.indexOf(task);
    this.tasksAll.splice(indexAll, 1);

    this.localstorageService.setTask(this.tasksAll);
  }

  public onCheckbox(task: TasksUserModel): void {
    let indexAll = this.tasksAll.findIndex(
      (item: TasksUserModel) => item.id === task.id
    );
    this.tasksAll[indexAll].completed = !task.completed;

    task.completed = !task.completed;

    this.localstorageService.setTask(this.tasksAll);
  }

  public changeTextTask(task: TasksUserModel, text: HTMLDivElement): void {
    if (text.textContent) {
      let indexAll = this.tasksAll.findIndex(
        (item: TasksUserModel) => item.id === task.id
      );
      this.tasksAll[indexAll].text = text.textContent;

      task.text = text.textContent;

      this.localstorageService.setTask(this.tasksAll);
    } else {
      this.onDelete(task);
    }
  }

  public addTask(): void {
    let testTask = this.myForm.controls['textTask'].value;

    let newTask = new TasksUserModel({
      _idUser: this.user.id,
      _text: testTask,
      _completed: false,
    });

    this.tasksUser.push(newTask);
    this.tasksAll.push(newTask);
    this.localstorageService.setTask(this.tasksAll);
  }

  public ngOnDestroy(): void {
    this.tasksAllSub.unsubscribe();
    this.tasksUserSub.unsubscribe();
  }
}
