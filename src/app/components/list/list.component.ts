import {Component, Input, OnInit} from '@angular/core';
import {TasksUserModel} from "../../models/tasksUser.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() task: TasksUserModel;

  constructor() { }

  public ngOnInit(): void {
  }

  onDelete(id: string): void{
  }

  onCheckbox(task: TasksUserModel): void{
  }
}
