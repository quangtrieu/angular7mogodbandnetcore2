
import { ResponseModel } from './response.model';
import { UserViewModel } from './user.viewmodel';

export class UserInquiryViewModelResponse extends ResponseModel  {
    public entity: Array<UserViewModel>;
}
