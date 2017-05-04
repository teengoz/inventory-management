import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';
import { ItemSupportingInformationComponent } from "../item-supporting-information/item-supporting-information.component";

@Component({
    selector: 'im-item-unit-conversion',
    templateUrl: './app/components/item-unit-conversion/item-unit-conversion.component.html',
    styleUrls: ['./app/components/item-unit-conversion/item-unit-conversion.component.css'],
    providers: [DynamicFormService],
})

export class ItemUnitConversionComponent implements OnInit {
    @ViewChild('childData') childData: ItemSupportingInformationComponent;
    @Input() ownerId;

    pageName = 'Quy đổi ĐVT';

    mainService;

    columns = [
        {
            title: 'ĐVT quy đổi',
            propName: 'inventoryItemUnitConversionName',
            width: 4,
            sort: true,
            filter: false
        },
        {
            title: 'Tỉ lệ',
            propName: 'inventoryItemUnitConversionRate',
            width: 2,
            sort: true,
            filter: false
        },
        //         {
        //     title: 'Phép tính',
        //     propName: 'inventoryItemUnitConversionOperator',
        //     width: 2,
        //     sort: true,
        //     filter: false
        // }
    ];

    options = {
        'disablePagination': true
    };

    actions = {
        add: 'itemUnitConversionAdd',
        clone: 'itemUnitConversionAdd',
        edit: 'itemUnitConversionEdit'
    };

    constructor(
        private router: Router,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
    }


    // -------------------------------------
    // Temporary actions
    add() {
        //this.dataTable.add();
    }

    onBulkAction(event) {
        //this.dataTable.onBulkAction(event);
    }

    getChildData() {
        return this.childData.getData();
    }

    resetInputData() {
        this.childData.resetInputData();
    }
}