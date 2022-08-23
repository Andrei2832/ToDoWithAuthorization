import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {LocalstorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit, OnDestroy{

  public userNow: User;

  constructor(
    private localstorageService: LocalstorageService,
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

}
