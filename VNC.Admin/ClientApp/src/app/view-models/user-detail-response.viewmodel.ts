
import { ResponseModel } from './response.model';
import { UserViewModel } from './user.viewmodel';

export class UserDetailViewModelResponse extends ResponseModel {
  public entity: UserViewModel;
}
