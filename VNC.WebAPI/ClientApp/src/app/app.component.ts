/* import { Component } from '@angular/core'; */
import { Router } from '@angular/router';
import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    opened = true;
    @ViewChild('sidenav',) sidenav: MatSidenav;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit() {
        console.log(window.innerWidth)
        if (window.innerWidth < 768) {
          this.sidenav.fixedTopGap = 55;
          this.opened = false;
        } else {
          this.sidenav.fixedTopGap = 55;
          this.opened = true;
        }
      }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      if (event.target.innerWidth < 768) {
        this.sidenav.fixedTopGap = 55;
        this.opened = false;
      } else {
        this.sidenav.fixedTopGap = 55
        this.opened = true;
      }
    }
    isBiggerScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 768) {
          return true;
        } else {
          return false;
        }
      }
}