
import { UserViewModel } from './user.viewmodel';

export class UserInquiryViewModel {
  public userId: string;
  public userName: string;
  public emailAddress: string;
  public currentPageNumber: number;
  public currentPageIndex: number;
  public pageSize: number;
  public sortDirection: string;
  public sortExpression: string;
  public totalPages: number;
  public totalUsers: number;
  public users: Array<UserViewModel>;
  public displayedColumns: Array<string>;
  public pageSizeOptions: Array<number>;
}
