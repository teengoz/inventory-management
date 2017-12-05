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

    query(parameters: any, page?: number, limit?: number): Promise<Transaction[]> {
        let urlQueryParam = [];
        let url = this.transactionsUrl + '/query';

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

        return this.http
            .post(url, JSON.stringify(parameters), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getById(id: string) {
        return this.http.get(this.transactionsUrl + '/' + id, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    findCode(code): Promise<any> {
        let url = this.transactionsUrl + '/code';
        if (code) {
            url += '/' + code;
        }

        return this.http
            .get(url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    search(keyword): Promise<any> {
        let url = this.transactionsUrl + '/search';
        if (keyword) {
            url += '/' + keyword;
        }

        return this.http
            .get(url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    hint(keyword?: string): Promise<Transaction[]> {
        let _url = this.transactionsUrl + '/hint/';
        let _keyword = keyword || '';
        _url += _keyword;

        return this.http
            .get(_url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    record(id: String, record: boolean): Promise<Transaction> {
        let url = `${this.transactionsUrl}/${id}/record/${record}`;
        return this.http
            .put(url, {} ,{ headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(item: any): Promise<Transaction> {
        if (item['basic']['transactionId']) {
            return this.put(item);
        }
        return this.post(item);
    }

    delete(item: Transaction): Promise<boolean> {
        return this.http.delete(this.transactionsUrl + '/' + item.transactionId, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    private post(item: Transaction): Promise<any> {
        return this.http
            .post(this.transactionsUrl, JSON.stringify(item), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(item: Transaction) {
        let url = `${this.transactionsUrl}/${item['basic']['transactionId']}`;

        return this.http
            .put(url, JSON.stringify(item), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    // private handleError(error: any): Promise<any> {
    //     console.log('An error occurred', error);
    //     //return Promise.reject(error.mesage || error);
    //     return new Promise();
    // }

    private handleError(error: any): any {
        console.log('An error occurred', error);
        return (error.mesage || error);
    }
}