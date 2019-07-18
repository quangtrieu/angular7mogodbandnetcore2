import { Role } from '@app/_models';
import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../_services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../shared/error-handler.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  id: string;
  role: Role;

  constructor(private route: ActivatedRoute, private router: Router, private errorHandler: ErrorHandlerService,
    private roleService: RoleService) { }

  ngOnInit() {
    this.role = new Role();

    this.id = this.route.snapshot.params['id'];
    
    this.roleService.getRoleById(this.id)
      .subscribe(data => {
        this.role = data;
      }, (error) =>{
        this.errorHandler.handleError(error);
      })
  }

  list(){
    this.router.navigate(['RoleList']);
  }
}
