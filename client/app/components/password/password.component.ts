import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';
import { FormGroup } from '@angular/forms';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { SystemConfig } from '../../models/system-config';
import { SystemConfigService } from '../../services/system-config.service';
import { InputControlService } from '../../services/input-control.service';
import { DynamicFormService } from '../../services/form.services';

@Component({
    selector: 'im-password',
    templateUrl: './app/components/password/password.component.html',
    styleUrls: ['./app/components/password/password.component.css'],
    providers: [SystemConfigService, DynamicFormService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class PasswordComponent implements OnInit {
    pageName = 'Đổi mật khẩu';
    form: FormGroup;

    fields = [
        'settingCurrency',
        'settingDatetimeFormat',
        'settingTimezone'
    ]

    configs;
    inputs = [
        {
            'key': 'key1',
            'label': 'Mật khẩu cũ',
            'required': true,
            'controlType': 'textbox',
            'type': 'text',
            'value': '',
            'labelWidth': 3,
            'inputWidth': 9
        },
        {
            'key': 'key2',
            'label': 'Mật khẩu mới',
            'required': true,
            'controlType': 'textbox',
            'type': 'text',
            'value': '',
            'labelWidth': 3,
            'inputWidth': 9
        },
        {
            'key': 'key3',
            'label': 'Xác nhận mật khẩu mới',
            'required': true,
            'controlType': 'textbox',
            'type': 'text',
            'value': '',
            'labelWidth': 3,
            'inputWidth': 9
        }
    ];
    mainServiceClass = SystemConfigService;
    submit = 'updateConfigs';
    valueDictionary = {};
    context = {
        'inputs': this.inputs,
        'valueDictionary': this.valueDictionary,
        'submit': this.submit,
        'service': SystemConfigService
    };

    constructor(
        private router: Router,
        private ics: InputControlService,
        private systemConfigService: SystemConfigService,
        private dfs: DynamicFormService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        //this.getFields(this.fields);
        //this.form = this.ics.toFormGroup(this.inputs);
    }

    // -------------------------------------
    // Call service methods
    getFields(fields: string[]) {
        return this.systemConfigService.getConfigList(fields).then(
            result => {
                this.configs = result;
                this.inputs = [];
                this.configs.forEach((elm: SystemConfig) => {
                    this.inputs.push({
                        'key': elm.systemConfigFieldName,
                        'label': elm.systemConfigName,
                        'required': elm.systemConfigRequired,
                        'controlType': elm.systemConfigControlType,
                        'type': elm.systemConfigInputType,
                        'value': elm.systemConfigValue,
                        'labelWidth': elm.systemConfigLabelWidth || 4,
                        'inputWidth': elm.systemConfigInputWidth || 8
                    });
                    this.valueDictionary[elm.systemConfigFieldName] = elm.systemConfigValue;
                });
                this.context = {
                    'inputs': this.inputs,
                    'valueDictionary': this.valueDictionary,
                    'submit': this.submit,
                    'service': SystemConfigService
                };
            },
            error => console.log(error)
        );
    }

    // -------------------------------------
    // Temporary methods
    onFormSubmit() {
        this.getFields(this.fields);
        this.modal.alert()
            .size('sm')
            .showClose(true)
            .title('Thông báo')
            .body(`Cập nhật thành công`)
            .open();
    }
}