export class UserModel{
  _id: string;
  _login: string;
  _password: string;
  _surname?: string;
  _name?: string;
  _patronymic?: string;

  constructor(login: string, password: string, surname: string = '', name: string = '', patronymic: string = '', id: string = '') {
    this._id = id ? id : this.uuidv4() ;
    this._login = login;
    this._password = password;
    this._surname = surname;
    this._name = name;
    this._patronymic = patronymic;
  }

  uuidv4() {
    return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  public get id(): string{
    return this._id;
  }

  public get login(): string{
    return this._login;
  }
  public set login(value: string){
    this._login = value;
  }

  public get password(): string{
    return this._password;
  }
  public set password(value: string){
    this._password = value;
  }

  public get surname(): string{
    return this._surname || '';
  }
  public set surname(value: string){
    this._surname = value;
  }

  public get name(): string{
    return this._name || '';
  }
  public set name(value: string){
    this._name = value;
  }

  public get patronymic(): string{
    return this._patronymic || '';
  }
  public set patronymic(value: string){
    this._patronymic = value;
  }
}
