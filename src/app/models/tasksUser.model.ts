import { ITasksUser } from '../interfaces/tasks-user.interface';

export class TasksUserModel {
  public _id: string;
  public _idUser: string;
  public _text: string;
  public _completed: boolean;

  constructor(data: ITasksUser) {
    this._id = data._id ? data._id : this.uuidv4();
    this._idUser = data._idUser;
    this._text = data._text;
    this._completed = data._completed;
  }

  private uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
  }

  public get id(): string {
    return this._id;
  }

  public get idUser(): string {
    return this._idUser;
  }

  public set idUser(value: string) {
    this._idUser = value;
  }

  public get text(): string {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
  }

  public get completed(): boolean {
    return this._completed;
  }

  public set completed(value: boolean) {
    this._completed = value;
  }
}
