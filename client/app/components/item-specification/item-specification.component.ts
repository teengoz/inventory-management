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
    selector: 'im-item-specification',
    templateUrl: './app/components/item-specification/item-specification.component.html',
    styleUrls: ['./app/components/item-specification/item-specification.component.css'],
    providers: [ DynamicFormService ],
})

export class ItemSpecificationComponent implements OnInit {
    @Input() ownerId;

    data = [
        {
            name: 'Thuộc tính 1',
            active: false,
        },
        {
            name: 'Thuộc tính 2',
            active: false,
        },
        {
            name: 'Thuộc tính 3',
            active: false,
        },
        {
            name: 'Thuộc tính 4',
            active: false,
        },
        {
            name: 'Thuộc tính 5',
            active: false,
        }
    ];

    defaultData = [
        {
            name: 'Thuộc tính 1',
            active: false,
        },
        {
            name: 'Thuộc tính 2',
            active: false,
        },
        {
            name: 'Thuộc tính 3',
            active: false,
        },
        {
            name: 'Thuộc tính 4',
            active: false,
        },
        {
            name: 'Thuộc tính 5',
            active: false,
        }
    ];

    defaultName = [
        'Thuộc tính 1', 'Thuộc tính 2', 'Thuộc tính 3', 'Thuộc tính 4', 'Thuộc tính 5'
    ]

    pageName = 'Tùy chọn thuộc tính';

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

    getData() {
        let _data = [];
        this.data.forEach((elm, idx) => {
            if (elm.active) {
                let _name = elm.name || this.defaultName[idx];
                _data[idx] = _name;
            }
        });
        return _data;
    }

    resetInputData() {
        this.data = this.defaultData;
    }
}