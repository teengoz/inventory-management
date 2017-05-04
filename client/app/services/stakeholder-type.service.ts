import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { StakeholderType } from '../models/stakeholder-type';

@Injectable()
export class StakeholderTypeService {
    private stakeholderTypesUrl = '/api/stakeholder-types';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    get(page?: number, limit?: number): Promise<StakeholderType[]> {
        let urlQueryParam = [];
        let url = this.stakeholderTypesUrl;

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
            .then(response => response.json() as StakeholderType[])
            .catch(this.handleError);
    }

    query(parameters: any, page?: number, limit?: number): Promise<StakeholderType[]> {
        let urlQueryParam = [];
        let url = this.stakeholderTypesUrl + '/query';

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

    hint(keyword ?: string): Promise<StakeholderType[]> {
        let _url = this.stakeholderTypesUrl + '/hint/';
        let _keyword = keyword || '';
        _url += _keyword;

        return this.http
            .get(_url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(stakeholderType: any): Promise<StakeholderType> {
        if (stakeholderType.stakeholderTypeId) {
            return this.put(stakeholderType);
        }
        return this.post(stakeholderType);
    }

    delete(stakeholderType: StakeholderType): Promise<boolean> {
        return this.http.delete(this.stakeholderTypesUrl + '/' + stakeholderType.stakeholderTypeId, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    private post(stakeholderType: StakeholderType): Promise<any> {
        return this.http
            .post(this.stakeholderTypesUrl, JSON.stringify(stakeholderType), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(stakeholderType: StakeholderType) {
        let url = `${this.stakeholderTypesUrl}/${stakeholderType.stakeholderTypeId}`;

        return this.http
            .put(url, JSON.stringify(stakeholderType), { headers: this.genHeader.return() })
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