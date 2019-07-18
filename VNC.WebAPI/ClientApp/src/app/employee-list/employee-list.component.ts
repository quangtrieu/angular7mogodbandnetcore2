import { UserService } from '../_services/user.service';
import { User } from '@app/_models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  userList: User[];
  dataSource: MatTableDataSource<User>;

  displayedColumns: string[] = ['userName', 'emailAddress','expiresIn','ipAddress','createdDate','gender','inExuer', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private router: Router,){

  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.userService.getAll().subscribe(data => {
      // Use MatTableDataSource for paginator
      this.dataSource = new MatTableDataSource(data);
     //console.log(this.dataSource);                     
      // Assign the paginator *after* dataSource is set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  AddNewUser(){
    this.router.navigate(['/employee-add']);
  }
  deleteUser(index: number, e){
    if(window.confirm('Are you sure you want to delete this ?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.userService.delete(e.id).subscribe()
    }
  }

  userDetails(id: string){
    this.router.navigate(['userDetails', id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
