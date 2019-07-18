import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInquiryViewModelResponse } from '../view-models/user-inquiry-response.viewmodel';
import { UserViewModel } from '../view-models/user.viewmodel';
import { UserInquiryViewModel } from '../view-models/user-inquiry.viewmodel';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';

@Component({
  selector: 'user-search',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css']
})
export class UserSearchComponent implements OnInit {

  // query results available in ngAfterViewInit
  //@ViewChild('form',) searchForm: NgForm;
  @ViewChild('form', {static: true}) searchForm: NgForm;

  public title = 'User Search';
  public userInquiryViewModel: UserInquiryViewModel;
  public selectedRowIndex = -1;

  constructor(private router: Router, private httpService: HttpService, private alertService: AlertService) {

    this.userInquiryViewModel = new UserInquiryViewModel();
    this.userInquiryViewModel.pageSize = 20;
    this.userInquiryViewModel.displayedColumns =
      ['userName', 'emailAddress', 'expiresIn', 'limitedTotal'];

  }

  ngOnInit() {
    this.initializeSearch();
    this.executeSearch();
  }

  private initializeSearch() {

    this.userInquiryViewModel.userName = '';
    this.userInquiryViewModel.emailAddress = '';
    this.userInquiryViewModel.currentPageNumber = 1;
    this.userInquiryViewModel.currentPageIndex = 0;
    this.userInquiryViewModel.totalPages = 0;
    this.userInquiryViewModel.totalUsers = 0;
    this.userInquiryViewModel.sortDirection = 'ASC';
    this.userInquiryViewModel.sortExpression = 'UserName';
    this.userInquiryViewModel.users = new Array<UserViewModel>();

  }

  public resetSearch() {
    this.initializeSearch();
    this.executeSearch();
  }

  public filteredSearch() {
    this.userInquiryViewModel.currentPageNumber = 1;
    this.userInquiryViewModel.currentPageIndex = 0;
    this.executeSearch();
  }

  private executeSearch() {

    let userInquiryViewModel = new UserInquiryViewModel();
    userInquiryViewModel.userName = this.userInquiryViewModel.userName;
    userInquiryViewModel.emailAddress = this.userInquiryViewModel.emailAddress;
    userInquiryViewModel.currentPageNumber = this.userInquiryViewModel.currentPageNumber;
    userInquiryViewModel.currentPageIndex = this.userInquiryViewModel.currentPageIndex;
    userInquiryViewModel.sortDirection =  this.userInquiryViewModel.sortDirection;
    userInquiryViewModel.sortExpression = this.userInquiryViewModel.sortExpression;
    userInquiryViewModel.users = this.userInquiryViewModel.users = new Array<UserViewModel>();
    let url = 'http://localhost:5001/api/' + 'User/GetAllUsers';
    this.httpService.HttpPost<UserInquiryViewModelResponse>(url, userInquiryViewModel).
      subscribe((response: UserInquiryViewModelResponse) => {
        this.userInquirySuccess(response);
      }, response => this.userInquiryFailed(response));
  }

  private userInquirySuccess(response: UserInquiryViewModelResponse) {
    this.userInquiryViewModel.users = response.entity;
    this.userInquiryViewModel.totalUsers = response.totalRows;
    this.userInquiryViewModel.totalPages = response.totalPages;
  }

  private userInquiryFailed(error: HttpErrorResponse) {
    let errorResponse: UserInquiryViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.userInquiryViewModel.currentPageNumber = event.pageIndex + 1;
    this.userInquiryViewModel.currentPageIndex = event.pageIndex;
    this.userInquiryViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public selectUser(i: string): void {
    let userId = this.userInquiryViewModel.users[i].id; console.log(this.userInquiryViewModel.users[i].id);
    this.router.navigate(['/userdetail'], { queryParams: { id: userId } });
  }

  public sortData(sort: MatSort) {
    this.userInquiryViewModel.currentPageNumber = 1;
    this.userInquiryViewModel.currentPageIndex = 0;
    this.userInquiryViewModel.sortDirection = sort.direction;
    this.userInquiryViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

}
