import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { Item } from '../models/item';

@Injectable()
export class ItemService {
    private ItemsUrl = '/api/items';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    get(page?: number, limit?: number): Promise<Item[]> {
        let urlQueryParam = [];
        let url = this.ItemsUrl;

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
            .then(response => response.json() as Item[])
            .catch(this.handleError);
    }

    query(parameters: any, page?: number, limit?: number): Promise<Item[]> {
        let urlQueryParam = [];
        let url = this.ItemsUrl + '/query';

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

    findCode(code): Promise<any> {
        let url = this.ItemsUrl + '/code';
        if (code) {
            url += '/' + code;
        }

        return this.http
            .get(url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getById(id: string) {
        return this.http.get(this.ItemsUrl + '/' + id, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getQuantity(id: string) {
        return this.http.get(this.ItemsUrl + '/' + id + '/quantity/', { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    search(keyword): Promise<any> {
        let url = this.ItemsUrl + '/search';
        if (keyword) {
            url += '/' + keyword;
        }

        return this.http
            .get(url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    hint(keyword?: string): Promise<Item[]> {
        let _url = this.ItemsUrl + '/hint/';
        let _keyword = keyword || '';
        _url += _keyword;

        return this.http
            .get(_url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(item: any): Promise<Item> {
        if (item['basic']['inventoryItemId']) {
            return this.put(item);
        }
        return this.post(item);
    }

    delete(item: Item): Promise<boolean> {
        return this.http.delete(this.ItemsUrl + '/' + item.inventoryItemId, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    private post(item: Item): Promise<any> {
        return this.http
            .post(this.ItemsUrl, JSON.stringify(item), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(item: Item) {
        let url = `${this.ItemsUrl}/${item['basic']['inventoryItemId']}`;

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