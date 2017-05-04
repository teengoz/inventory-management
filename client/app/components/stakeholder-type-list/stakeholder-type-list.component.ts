import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { StakeholderType } from '../../models/stakeholder-type';
import { StakeholderTypeService } from '../../services/stakeholder-type.service';
import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';

@Component({
    selector: 'im-stakeholder-type-list',
    templateUrl: './app/components/stakeholder-type-list/stakeholder-type-list.component.html',
    styleUrls: ['./app/components/stakeholder-type-list/stakeholder-type-list.component.css'],
    providers: [StakeholderTypeService, DynamicFormService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class StakeholderTypeListComponent implements OnInit {
    @ViewChild('dataTable') dataTable: IMTableComponent;

    pageName = 'Nhóm đối tác';

    columns = [
        {
            title: 'Mã nhóm ĐT',
            propName: 'stakeholderTypeCode',
            width: 2,
            sort: true,
            filter: true
        },
        {
            title: 'Tên nhóm ĐT',
            propName: 'stakeholderTypeName',
            width: 4,
            sort: true,
            filter: true
        },
        {
            title: 'Mô tả nhóm ĐT',
            propName: 'stakeholderTypeDescription',
            width: 4,
            sort: true,
            filter: true
        }
    ];

    actions = {
        add: 'stakeholderTypeAdd',
        clone: 'stakeholderTypeAdd',
        edit: 'stakeholderTypeEdit'
    };

    mainService;

    constructor(
        private router: Router,
        private stakeholderTypeService: StakeholderTypeService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService
    ) {
        overlay.defaultViewContainer = vcRef;
        this.mainService = stakeholderTypeService;
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