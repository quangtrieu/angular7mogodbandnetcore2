import {RoleService} from '../_services/role.service';
import { Role } from '@app/_models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';  
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { SuccessDialogComponent } from './../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from './../shared/error-handler.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  roleForm: any;  
  role: Role = new Role();
  submitted = false;
  private dialogConfig;

  constructor(private location: Location, private roleService: RoleService, private formBuilder: FormBuilder, private dialog: MatDialog, private errorService: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required], 
  });
  }

  save() {
    this.roleService.createRole(this.role)
      .subscribe(data => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed()
        .subscribe(result => {
          //this.location.back();
          this.gotoList();
        });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
    //this.role = new Role();
      )
  }

  onFormSubmit() {
    this.submitted = true;
    this.role = this.roleForm.value;  
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/RoleList']);
  }

  resetForm() {
    this.roleForm.reset();
  }

  cancelForm(){
    this.router.navigateByUrl('/RoleList')
  }
}
