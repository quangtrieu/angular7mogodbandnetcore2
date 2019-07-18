import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { UserService } from '../_services/user.service';
import { RoleService } from '../_services/role.service';
import { User } from '@app/_models';
import { Role } from '@app/_models';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: any;  
  allusers: Observable<User[]>;  
  massage = null;  
  rolesList: Role[];
  //RoleDetails: Role[];
  constructor(private formbulider: FormBuilder, 
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private roleService: RoleService,
    private userService: UserService) {
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.userService.getUserById(id).subscribe(data => {
        this.employeeForm.controls['UserName'].setValue(data.userName);
        this.employeeForm.controls['EmailAddress'].setValue(data.emailAddress);
        this.employeeForm.controls['Gender'].setValue(data.gender);
        this.employeeForm.controls['ExpiresIn'].setValue(data.expiresIn);
        this.employeeForm.controls['InExuer'].setValue(data.inExuer);
        this.employeeForm.controls['LimitedTotal'].setValue(data.limitedTotal);
        this.employeeForm.controls['RoleDetails'].setValue(data.roleDetails);
        this.employeeForm = this.fb.group({
          UserName: [data.userName, [Validators.required]],
          EmailAddress: [data.emailAddress, [Validators.required]],
          Gender: [data.gender, [Validators.required]],
          ExpiresIn: [data.expiresIn, [Validators.required]],
          InExuer: [data.inExuer, [Validators.required]],
          LimitedTotal: [data.limitedTotal, [Validators.required]],
          RoleDetails: [data.roleDetails, [Validators.required]]
        })      
      })
     }  

     ngOnInit() {
      this.employeeForm = this.fb.group({  
        UserName: ['', [Validators.required]],  
        EmailAddress: ['', [Validators.nullValidator]], 
        Gender: ['', [Validators.required]] ,
        ExpiresIn: ['', [Validators.required]] ,
        InExuer: ['', [Validators.required]],
        LimitedTotal: ['', [Validators.required]],
        RoleDetails: ['', [Validators.required]]
      });  
      this.getAllRoles();
    }
  
    getAllRoles(){
      this.roleService.AllRoleDetails().subscribe(data => {
        this.rolesList = data;
        //console.log(this.rolesList);
      });
    }

  onFormSubmit() {  
    const user = this.employeeForm.value;  
    this.updateUserForm(user);
    this.employeeForm.reset();  
  }

  /* Update user */
  updateUserForm(user: User) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    user.id = id;
    if (window.confirm('Are you sure you want to update?')) {
      this.userService.updateUser(user).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/Employee-list'))
      });
    }
  }
  resetForm() {
    this.employeeForm.reset();
  }

  cancelForm(){
    this.router.navigateByUrl('/Employee-list')
  }
}
