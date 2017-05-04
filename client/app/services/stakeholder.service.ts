import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { Stakeholder } from '../models/stakeholder';

@Injectable()
export class StakeholderService {
    private stakeholdersUrl = '/api/stakeholders';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    get(page?: number, limit?: number): Promise<Stakeholder[]> {
        let urlQueryParam = [];
        let url = this.stakeholdersUrl;

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
            .then(response => response.json() as Stakeholder[])
            .catch(this.handleError);
    }

    delete(stakeholder: Stakeholder): Promise<boolean> {
        return this.http.delete(this.stakeholdersUrl + '/' + stakeholder.stakeholderId, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().success as boolean)
            .catch(this.handleError);
    }

    query(parameters: any, page?: number, limit?: number): Promise<Stakeholder[]> {
        let urlQueryParam = [];
        let url = this.stakeholdersUrl + '/query';

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
            //.then(response => {console.log(response.json()); return response.json();})
            .catch(this.handleError);
    }

    search(keyword?: string): Promise<any> {
        let url = this.stakeholdersUrl + '/search';
        if (keyword) {
            url += '/' + keyword;
        }

        return this.http
            .get(url, { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(stakeholder: any): Promise<Stakeholder> {
        if (stakeholder.stakeholderId) {
            return this.put(stakeholder);
        }
        return this.post(stakeholder);
    }

    private post(stakeholder: Stakeholder): Promise<any> {
        return this.http
            .post(this.stakeholdersUrl, JSON.stringify(stakeholder), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private put(stakeholder: Stakeholder) {
        let url = `${this.stakeholdersUrl}/${stakeholder.stakeholderId}`;

        return this.http
            .put(url, JSON.stringify(stakeholder), { headers: this.genHeader.return() })
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