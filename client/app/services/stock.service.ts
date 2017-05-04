import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { Stock } from '../models/stock';

@Injectable()
export class StockService {
    private stocksUrl = '/api/stocks';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    get(page?: number, limit?: number): Promise<Stock[]> {
        let urlQueryParam = [];
        let url = this.stocksUrl;

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
            .then(response => response.json() as Stock[])
            .catch(this.handleError);
    }

    delete(stock: Stock): Promise<boolean> {
        return this.http.delete(this.stocksUrl + '/' + stock.stockId, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    query(parameters: any, page?: number, limit?: number): Promise<Stock[]> {
        let urlQueryParam = [];
        let url = this.stocksUrl + '/query';

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

    search(keyword?: string): Promise<any> {
        let url = this.stocksUrl + '/search';
        if (keyword) {
            url += '/' + keyword;
        }

        return this.http
            .get(url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(stock: Stock): Promise<Stock> {
        if (stock.stockId) {
            return this.put(stock);
        }
        return this.post(stock);
    }

    private post(stock: Stock): Promise<any> {
        return this.http
            .post(this.stocksUrl, JSON.stringify(stock), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(stock: Stock) {
        let url = `${this.stocksUrl}/${stock.stockId}`;

        return this.http
            .put(url, JSON.stringify(stock), { headers: this.genHeader.return() })
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