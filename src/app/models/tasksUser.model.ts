export class TasksUserModel {
  _id: string;
  _idUser: string;
  _text: string;
  _completed: boolean;

  constructor(idUser: string, text: string, completed: boolean, id: string = '') {
    this._id = id ? id : this.uuidv4();
    this._idUser = idUser;
    this._text = text;
    this._completed = completed;
  }

  uuidv4() {
    return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  public get id(): string{
    return this._id;
  }

  public get idUser(): string{
    return this._idUser;
  }
  public set idUser(value: string){
    this._idUser = value;
  }

  public get text(): string{
    return this._text;
  }
  public set text(value: string){
    this._text = value;
  }

  public get completed(): boolean{
    return this._completed;
  }
  public set completed(value: boolean){
    this._completed = value;
  }
}
