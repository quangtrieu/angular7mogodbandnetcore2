import { RoleDetailViewModel } from './roleDetails';

export class UserViewModel {

    constructor() {
      this.id = '';
      this.userName = '';
      this.password = '';
      this.emailAddress = '';
      this.gender = '';
      this.expiresIn = new Date;
      this.ipAddress = '';
      this.inExuer = '';
      this.roleDetails = new Array<RoleDetailViewModel>();
    }
  
    public id: string;
    public userName: string;
    public password: string;
    public emailAddress: string;
    public gender: String;
    public expiresIn: Date;
    public ipAddress: string;
    public createdDate: Date;
    public limitedTotal: number;
    public inExuer: string;
    public accessToken:string;
    public roleDetails: Array<RoleDetailViewModel>;
  }