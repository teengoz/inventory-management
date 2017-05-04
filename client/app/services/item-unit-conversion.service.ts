import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { ItemUnitConversion } from '../models/item-unit-conversion';

@Injectable()
export class ItemUnitConversionService {
    private ItemsUrl = '/api/item-unit-conversion';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    get(page?: number, limit?: number): Promise<ItemUnitConversion[]> {
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
            .then(response => response.json())
            .catch(this.handleError);
    }

    query(parameters: any, page?: number, limit?: number) {
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

    hint(keyword ?: string): Promise<ItemUnitConversion[]> {
        let _url = this.ItemsUrl + '/hint/';
        let _keyword = keyword || '';
        _url += _keyword;

        return this.http
            .get(_url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(item: any): Promise<ItemUnitConversion> {
        if (item.inventoryItemUnitConversionId) {
            return this.put(item);
        }
        return this.post(item);
    }

    delete(item: ItemUnitConversion): Promise<boolean> {
        return this.http.delete(this.ItemsUrl + '/' + item.inventoryItemUnitConversionId, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    private post(item: ItemUnitConversion): Promise<any> {
        return this.http
            .post(this.ItemsUrl, JSON.stringify(item), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(item: ItemUnitConversion) {
        let url = `${this.ItemsUrl}/${item.inventoryItemUnitConversionId}`;

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