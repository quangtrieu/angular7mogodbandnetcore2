import { RoleDetailViewModel } from './roleDetails';

export class User {
    id: string;
    userName: string;
    password: string;
    emailAddress: string;
    gender: String;
    expiresIn: Date;
    ipAddress: string;
    createdDate: Date;
    limitedTotal: number;
    inExuer: string;
    accessToken:string;
    roleDetails: Array<RoleDetailViewModel>;
}