import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '@app/_services';
import { User } from '@app/_models';
@Component({
  selector: 'app-employee-changepassword',
  templateUrl: './employee-changepassword.component.html',
  styleUrls: ['./employee-changepassword.component.css']
})
export class EmployeeChangepasswordComponent implements OnInit {

  changepasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
) { 
    // redirect to home if already logged in
  /*   if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    } */
}

  ngOnInit() {
      this.changepasswordForm = this.formBuilder.group({
        Password: ['', [Validators.required, Validators.minLength(6)]],
        NewPassword: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

// convenience getter for easy access to form fields
get f() { return this.changepasswordForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.changepasswordForm.invalid) {
          return;
      }
     const user = this.changepasswordForm.value;  
     this.updateUserForm(user);
  }

    /* Update user */
    updateUserForm(user: User) {
      var id = this.actRoute.snapshot.paramMap.get('id');
      user.id = id;
      this.loading = true;
      this.userService.changepassword(user)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Change password successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
}
