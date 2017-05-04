import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class GenerateHeader {
    headers: Headers;

    constructor() {
    }

    public return() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser && currentUser.token;
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.headers;
    }
}