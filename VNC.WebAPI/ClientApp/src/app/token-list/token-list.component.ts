import { TokenService } from '../_services/token.service';
import { Token } from '@app/_models'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  allToken:Token[];
  dataSource: MatTableDataSource<Token>;
  displayedColumns: string[] = ['userName', 'tokenKey'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tokenService: TokenService, private router: Router,){

  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.tokenService.AllTokentails().subscribe(data => {
      // Use MatTableDataSource for paginator
      this.dataSource = new MatTableDataSource(data);
      // Assign the paginator *after* dataSource is set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
