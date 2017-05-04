import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routerTransition } from '../../app.animation';
import { AuthenticationService } from '../../services/authentication.service';

//////////////////////////////////////////////
//Debug code for Add New and Authenticate User
import { HeroService } from "../../services/debug.service";
import { Hero } from '../../models/hero';
//////////////////////////////////////////////

@Component({
    selector: 'im-login',
    templateUrl: './app/components/login/login.component.html',
    styleUrls: ['./app/components/login/login.component.css'],
    providers: [ HeroService ],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class LoginComponent implements OnInit {
    loginF: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private heroService: HeroService) {
    }

    //////////////////////////////////////////////
    //Debug code for Add New and Authenticate User
    debugPOST() {
        alert('abc');
        let _hero = {
            username: 'admin',
            password: 'admin'
        }
        this.heroService
            .save(_hero)
            .then(hero => {
                console.log("ADDED HERO");
            })
            .catch(error => this.error = error);
    }
    //////////////////////////////////////////////

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.authenticationService.check().then(result => {
                if (result) {
                    this.router.navigate(['/management']);
                }
            })
        } else {
            localStorage.removeItem("currentUser");
        }
    }

    login() {
        this.loading = true;
        this.authenticationService
            .login(this.loginF.username, this.loginF.password)
            .then(result => {
                if (result.success === true) {
                    // login successful
                    this.router.navigate(['management']);
                } else {
                    // login failed
                    this.error = result.errors.toString();
                    this.loading = false;
                }
            })
            .catch(error => console.log(error));
    }

}