import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GenerateHeader } from '../services/generate-header';
import { UtilityService as util } from '../services/utility.service';
import { SystemConfig } from '../models/system-config';

@Injectable()
export class SystemConfigService {
    private systemConfigUrl = '/api/config';
    private token: string;

    constructor(
        private http?: Http,
        private genHeader?: GenerateHeader
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    };

    getConfigList(fieldNameList: string[]): Promise<SystemConfig[]> {
        return this.http
            .post(this.systemConfigUrl + '/getConfigs', JSON.stringify(fieldNameList), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json().data as SystemConfig[])
            .catch(this.handleError);
    }

    updateConfigs(configs: any) {
        return this.http
            .put(this.systemConfigUrl + '/updateConfigs', JSON.stringify(configs), { headers: this.genHeader.return() })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): any {
        console.log('An error occurred', error);
        return (error.mesage || error);
    }
}