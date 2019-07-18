import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {TokenService} from '../_services/token.service';
import { Token } from '@app/_models'

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  tokenList: Token[];
  dataavailbale: Boolean = false;
  tempemp: Token;


  constructor(private tokenService: TokenService, private route: Router ) { }

  ngOnInit() {
    this.loadTokenData();
  }

  loadTokenData(){
    this.tokenService.getAllTokens().subscribe((tokendata) =>{
      this.tokenList = tokendata;console.log(tokendata);
      if(this.tokenList.length > 0 )
        this.dataavailbale = true;
      else
        this.dataavailbale = false;
    })
  }

}
