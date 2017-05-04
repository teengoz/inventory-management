import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { GenerateHeader } from '../services/generate-header';

@Injectable()
export class AuthenticationService {
    token: string;

    constructor(private http: Http,
                private genHeader: GenerateHeader) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post('/api/auth', JSON.stringify({ username: username, password: password }), { headers })
            .toPromise()
            .then(response => {
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    // return true to indicate successful login
                    return {
                        success: true
                    };
                } else {
                    // return false to indicate failed login
                    let errors = response.json().errors;
                    return {
                        success: false,
                        errors
                    }
                }
            }, response => {
                let errors = response.json().errors;
                return {
                    success: false,
                    errors
                }
            })
            .catch(this.handleError);
    }

    check(): Promise<any> {
        return this.http
            .get('/api/auth/check', { headers: this.genHeader.return() })
            .toPromise()
            .then(response => {
                return response.json().success;
            }, response => {
                return false;
            })
            .catch(this.handleError);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return (error.message || error);
        //return Promise.reject(error.message || error);
    }
}