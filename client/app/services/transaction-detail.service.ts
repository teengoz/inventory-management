import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionService {
    private transactionsUrl = '/api/transactions';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    get(page?: number, limit?: number): Promise<Transaction[]> {
        let urlQueryParam = [];
        let url = this.transactionsUrl;

        if (page) {
            urlQueryParam.push({
                key: 'page',
                value: page
            });
        }

        if (limit) {
            urlQueryParam.push({
                key: 'limit',
                value: limit
            });
        }

        let strUrlQueryParam = util.generateUrlQuery(urlQueryParam);
        if (strUrlQueryParam) {
            url += '?' + strUrlQueryParam;
        }

        return this.http.get(url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json() as Transaction[])
            .catch(this.handleError);
    }

    private handleError(error: any): any {
        console.log('An error occurred', error);
        return (error.mesage || error);
    }
}