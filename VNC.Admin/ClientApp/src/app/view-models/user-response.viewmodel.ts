
import { ResponseModel } from './response.model';
import { UserViewModel } from './user.viewmodel';

export class UserViewModelResponse extends ResponseModel  {
    public entity: Array<UserViewModel>;
}
