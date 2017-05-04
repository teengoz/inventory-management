import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Stock } from '../../models/stock';
import { StockService } from '../../services/stock.service';
import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';

@Component({
    selector: 'im-stock-list',
    templateUrl: './app/components/stock-list/stock-list.component.html',
    styleUrls: ['./app/components/stock-list/stock-list.component.css'],
    providers: [StockService, DynamicFormService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class StockListComponent implements OnInit {
    @ViewChild('dataTable') dataTable: IMTableComponent;

    pageName = 'Kho';

    columns = [
        {
            title: 'Mã kho',
            propName: 'stockCode',
            width: 1,
            sort: true,
            filter: true
        },
        {
            title: 'Tên kho',
            propName: 'stockName',
            width: 3,
            sort: true,
            filter: true
        },
        {
            title: 'Địa chỉ kho',
            propName: 'stockAddress',
            width: 6,
            sort: true,
            filter: true
        }
    ];

    actions = {
        add: 'stockAdd',
        clone: 'stockAdd',
        edit: 'stockEdit'
    };

    mainService;

    constructor(
        private router: Router,
        private stockService: StockService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService
    ) {
        overlay.defaultViewContainer = vcRef;
        this.mainService = stockService;
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