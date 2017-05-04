import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Stakeholder } from '../../models/stakeholder';
import { StakeholderService } from '../../services/stakeholder.service';
import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';

@Component({
    selector: 'im-stakeholder-list',
    templateUrl: './app/components/stakeholder-list/stakeholder-list.component.html',
    styleUrls: ['./app/components/stakeholder-list/stakeholder-list.component.css'],
    providers: [StakeholderService, DynamicFormService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class StakeholderListComponent implements OnInit {
    @ViewChild('dataTable') dataTable: IMTableComponent;

    pageName = 'Đối tác';

    columns = [
        {
            title: 'Mã ĐT',
            propName: 'stakeholderCode',
            width: 1,
            sort: true,
            filter: true
        },
        {
            title: 'Tên ĐT',
            propName: 'stakeholderName',
            width: 2,
            sort: true,
            filter: true
        },
        {
            title: 'Nhóm ĐT',
            propName: 'stakeholderType.stakeholderTypeName',
            width: 2,
            sort: true,
            filter: true
        },
        {
            title: 'SĐT',
            propName: 'stakeholderPhone1',
            width: 1,
            sort: true,
            filter: true
        },
        {
            title: 'Email',
            propName: 'stakeholderEmail',
            width: 2,
            sort: true,
            filter: true
        },
        {
            title: 'Địa chỉ',
            propName: 'stakeholderAddress',
            width: 2,
            sort: true,
            filter: true
        }
    ];

    actions = {
        add: 'stakeholderAdd',
        clone: 'stakeholderAdd',
        edit: 'stakeholderEdit'
    };

    mainService;

    constructor(
        private router: Router,
        private stakeService: StakeholderService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService
    ) {
        overlay.defaultViewContainer = vcRef;
        this.mainService = stakeService;
    }

    ngOnInit() {
    }


    // -------------------------------------
    // Temporary actions
    add() {
        this.dataTable.add();
    }

    onBulkAction(event) {
        this.dataTable.onBulkAction(event);
    }
}