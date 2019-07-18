import {RoleService} from '../_services/role.service';
import { Role } from '@app/_models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { SuccessDialogComponent } from '../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../shared/error-handler.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  rolesList: Role[];
  dataSource: MatTableDataSource<Role>;
  private dialogConfig;

  displayedColumns: string[] = [ 'name', 'description', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    constructor(private location: Location, private roleService: RoleService, private router: Router, private dialog: MatDialog, private errorService: ErrorHandlerService,){

    }
   
    ngOnInit() {
      this.reloadData();
    }

  reloadData(){
    this.roleService.AllRoleDetails().subscribe(data => {
      // Use MatTableDataSource for paginator
      this.dataSource = new MatTableDataSource(data);
     //console.log(this.dataSource);                     
      // Assign the paginator *after* dataSource is set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  AddNewRole(){
    this.router.navigate(['/Add-Role']);
  }
  delete(id: string) {
    this.roleService.deleteRole(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  deleteRole(index: number, e){
    if(window.confirm('Are you sure you want to delete this ?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.roleService.deleteRole(e.id).subscribe(res=>{
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterClosed()
          .subscribe(result => {
            //this.location.back();
            this.router.navigate(['RoleList']);
          });
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
      //end
    }
  }

  roleDetails(id: string){
    this.router.navigate(['details', id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
