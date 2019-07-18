import { User } from '@app/_models';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../shared/error-handler.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  
  id: string;
  user: User;

  constructor(private route: ActivatedRoute,private router: Router, private errorHandler: ErrorHandlerService,
    private userService: UserService) { }

    ngOnInit() {
      this.user = new User();
  
      this.id = this.route.snapshot.params['id'];
      
      this.userService.getUserDetailById(this.id)
        .subscribe(data => {
          //console.log(data)
          this.user = data;//console.log(this.user);
        }, (error) =>{
          this.errorHandler.handleError(error);
        })
    }

    list(){
      this.router.navigate(['Employee-list']);
    }
}
