import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { UserDetailViewModelResponse } from '../view-models/user-detail-response.viewmodel';
import { UserViewModel } from '../view-models/user.viewmodel';
import { UserDetailViewModel } from '../view-models/user-detail.viewmodel';

import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './userdetail.component.html',
    styleUrls: ['./userdetail.component.css']
  })

  
export class UserDetailComponent implements OnInit {
    userForm: any;  
    public title = 'User Detail';
    public userDetailViewModel: UserDetailViewModel;
    private routerSubscription: Subscription;
    
    constructor(private formbulider: FormBuilder, private route: ActivatedRoute, private router: Router, private httpService: HttpService, private alertService: AlertService) {
      this.userDetailViewModel = new UserDetailViewModel();
      this.userDetailViewModel.user = new UserViewModel();

    }
  
    ngOnInit() {
      this.routerSubscription = this.route.queryParams.subscribe(params => {
        let userId: string = params['id'] + "";
        this.getUsertDetail(userId);
      });
  /*     this.userForm = this.formbulider.group({
        EmailAddress: ['', [Validators.required, Validators.email]], 
      });  */ 
  
    }
  
    ngOnDestroy() {
      this.routerSubscription.unsubscribe();
    }
  
    private getUsertDetail(userId: string): void {
  
      let url = 'http://localhost:5001/api/' + 'User/GetUserDetail/' + userId;
      this.httpService.HttpGet<UserDetailViewModelResponse>(url).
        subscribe((response: UserDetailViewModelResponse) => {
          this.getUserDetailSuccess(response);
        }, response => this.getUserDetailFailed(response));
    }
  
  
    private getUserDetailSuccess(response: UserDetailViewModelResponse) {
      this.userDetailViewModel.user = response.entity;
    }
  
    private getUserDetailFailed(error: HttpErrorResponse) {
      let errorResponse: UserDetailViewModelResponse = error.error;
      if (error.status > 0) {
        this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
      } else {
        this.alertService.ShowErrorMessage(error.message);
      }
    }
  
    public UpdateUser(user: UserViewModel) {debugger;
    /*     user.id = this.userDetailViewModel.user.id;
        user.userName = this.userDetailViewModel.user.userName;
        user.emailAddress = this.userDetailViewModel.user.emailAddress; */
        this.router.navigate(['/user-search']);
      }
  }