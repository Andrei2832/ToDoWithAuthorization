import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksUserModel} from "../../models/tasksUser.model";
import {User} from "../../models/user.model";
import {DataService} from "../../services/data.service";
import {LocalstorageService} from "../../services/localstorage.service";
import {map, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public user: User = this.dataService.userNow;

  public tasksSub: Subscription;
  public tasksAll: TasksUserModel[]
  public tasks: TasksUserModel[]

  constructor(
    private dataService: DataService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tasksSub = this.localstorageService.getTask().subscribe((tasks) => this.tasksAll = tasks )

    this.tasksSub = this.localstorageService.getTask().pipe(map((item) => {
      return item.filter((user) => user.idUser === this.user.id)
    })).subscribe((tasks) => this.tasks = tasks)
  }

  public ngOnInit(): void {
  }

  public addTask(task: string): void{
    if (task.trim()){
      let newTask = new TasksUserModel({
        idUser: this.user.id,
        text: task.trim(),
        completed: false,
      })
      this.tasks.push(newTask);
      this.tasksAll.push(newTask)
      this.localstorageService.setTask(this.tasksAll);
    }
  }

  public showProfile(){
    this.router.navigate(['profile'], {relativeTo: this.route})
  }
  public showList(){
    this.router.navigate(['list'], {relativeTo: this.route})
  }
  public ngOnDestroy(): void {
    this.tasksSub.unsubscribe()
  }
}
