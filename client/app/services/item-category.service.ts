import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { ItemCategory } from '../models/item-category';

@Injectable()
export class ItemCategoryService {
    private itemCategorysUrl = '/api/item-categories';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    get(page?: number, limit?: number): Promise<ItemCategory[]> {
        let urlQueryParam = [];
        let url = this.itemCategorysUrl;

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
            .then(response => response.json() as ItemCategory[])
            .catch(this.handleError);
    }

    query(parameters: any, page?: number, limit?: number): Promise<ItemCategory[]> {
        let urlQueryParam = [];
        let url = this.itemCategorysUrl + '/query';

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

    hint(keyword ?: string): Promise<ItemCategory[]> {
        let _url = this.itemCategorysUrl + '/hint/';
        let _keyword = keyword || '';
        _url += _keyword;

        return this.http
            .get(_url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(itemCategory: any): Promise<ItemCategory> {
        if (itemCategory.inventoryItemCategoryId) {
            return this.put(itemCategory);
        }
        return this.post(itemCategory);
    }

    delete(itemCategory: ItemCategory): Promise<boolean> {
        return this.http.delete(this.itemCategorysUrl + '/' + itemCategory.inventoryItemCategoryId, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    private post(itemCategory: ItemCategory): Promise<any> {
        return this.http
            .post(this.itemCategorysUrl, JSON.stringify(itemCategory), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(itemCategory: ItemCategory) {
        let url = `${this.itemCategorysUrl}/${itemCategory.inventoryItemCategoryId}`;

        return this.http
            .put(url, JSON.stringify(itemCategory), { headers: this.genHeader.return() })
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