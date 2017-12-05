import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { routerTransition } from '../../app.animation';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'im-management',
    templateUrl: './app/components/management/management.component.html',
    styleUrls: ['./app/components/management/management.component.css'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class ManagementComponent implements OnInit {
    @ViewChild('navbarToggler') navbarToggler: ElementRef;

    userName = "userName";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                //this.collapseNav();
            }
        });
    }

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.authenticationService.check().then(result => {
                if (!result) {
                    this.router.navigate(['/']);
                }
                let localUser = JSON.parse(localStorage.getItem('currentUser'));
                this.userName = localUser['username'];
            })
        } else {
            this.router.navigate(['/']);
        }
    }

    navBarTogglerIsVisible() {
        return this.navbarToggler.nativeElement.offsetParent !== null;
    }

    collapseNav() {
        if (this.navBarTogglerIsVisible()) {
            this.navbarToggler.nativeElement.click();
        }
    }

    clickLink(event) {
        event.stopPropagation();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}