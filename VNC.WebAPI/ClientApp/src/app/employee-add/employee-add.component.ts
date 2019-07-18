import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';  
import { Role } from '@app/_models';
import { User } from '@app/_models';
import { UserViewModel } from '@app/_models';
import { RoleDetailViewModel } from '@app/_models';
import { UserService, RoleService } from '@app/_services';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from './../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from './../shared/error-handler.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
    
    private dialogConfig;
    rolesList: Role[];
    employeeForm: any;  
    user: User = new User();
    submitted = false;
  
    constructor(private location: Location, private dialog: MatDialog, private errorService: ErrorHandlerService, private userService: UserService, private roleService: RoleService, private formBuilder: FormBuilder,
      private router: Router) { }
  
    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            UserName: ['', [Validators.required]],  
            Password: ['', [Validators.required, Validators.minLength(6)]],  
            EmailAddress: ['', [Validators.required, Validators.email]],  
            ExpiresIn: ['', [Validators.required]],  
            LimitedTotal: ['', [Validators.required]],
            Gender: ['', [Validators.required]],
            InExuer: ['', [Validators.required]],
            RoleDetails: ['', [Validators.required]],  
        });
        
        this.getAllRoles();

    }

    getAllRoles(){
      this.roleService.AllRoleDetails().subscribe(data => {
        this.rolesList = data;
      });
    }

    save(user: User) {
        this.userService.createUser(user)
          .subscribe(data => console.log(data), error => console.log(error));
        this.gotoList();
      }
    
      onFormSubmit() {
        this.submitted = true;
        const user = this.employeeForm.value;  
       let userViewModel: UserViewModel = new UserViewModel();
        userViewModel.userName = user.UserName;
        userViewModel.password = user.Password;
        userViewModel.emailAddress = user.EmailAddress;
        userViewModel.expiresIn = user.ExpiresIn;
        userViewModel.gender = user.Gender;
        userViewModel.inExuer = user.InExuer;
        userViewModel.limitedTotal = user.LimitedTotal;
        userViewModel.roleDetails = new Array<RoleDetailViewModel>();

        user.RoleDetails.forEach(function (detail) {
          let roleDetailViewModel = new RoleDetailViewModel();
          roleDetailViewModel.id = detail.id;
          roleDetailViewModel.name = detail.name;
          userViewModel.roleDetails.push(roleDetailViewModel);
      });
         this.userService.createUser(userViewModel)
        .subscribe(result => {
          let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

          dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      )
       // this.gotoList();
        //this.save(userViewModel);    
      }
    
      gotoList() {
        this.router.navigate(['/Employee-list']);
      }
    
      resetForm() {
        this.employeeForm.reset();
      }
    
      cancelForm(){
        this.router.navigateByUrl('/Employee-list')
      }
  
}
