import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksUserModel } from '../../models/tasksUser.model';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {}

  public showProfile(): void {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }

  public showList(): void {
    this.router.navigate(['list'], { relativeTo: this.route });
  }
}
