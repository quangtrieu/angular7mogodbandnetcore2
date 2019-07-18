import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { RoleService } from '../_services/role.service';
import { Role } from '@app/_models';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})

export class EditRoleComponent implements OnInit {
  roleForm: any;  
  allRoles: Observable<Role[]>;  
  massage = null;  

  constructor(private formbulider: FormBuilder, 
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private roleService: RoleService) {
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.roleService.getRoleById(id).subscribe(data => {
        this.roleForm.controls['Name'].setValue(data.name);
        this.roleForm.controls['Description'].setValue(data.description);
        this.roleForm = this.fb.group({
          Name: [data.name, [Validators.required]],
          Description: [data.description, [Validators.required]]
        })      
      })
     }  

     ngOnInit() {
      this.roleForm = this.fb.group({  
        Name: ['', [Validators.required]],  
        Description: ['', [Validators.nullValidator]] 
      });  
 
    }
  

  onFormSubmit() {  
    const role = this.roleForm.value;  
    this.updateRoleForm(role);
    this.roleForm.reset();  
  }

  /* Update role */
  updateRoleForm(role: Role) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    role.id = id;
    if (window.confirm('Are you sure you want to update?')) {
      this.roleService.update(role).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/RoleList'))
      });
    }
  }
  resetForm() {
    this.roleForm.reset();
  }

  cancelForm(){
    this.router.navigateByUrl('/RoleList')
  }
}