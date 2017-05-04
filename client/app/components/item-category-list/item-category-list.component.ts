import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ItemCategory } from '../../models/item-category';
import { ItemCategoryService } from '../../services/item-category.service';
import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';

@Component({
    selector: 'im-stakeholder-type-list',
    templateUrl: './app/components/stakeholder-type-list/stakeholder-type-list.component.html',
    styleUrls: ['./app/components/stakeholder-type-list/stakeholder-type-list.component.css'],
    providers: [ItemCategoryService, DynamicFormService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class ItemCategoryListComponent implements OnInit {
    @ViewChild('dataTable') dataTable: IMTableComponent;

    pageName = 'Nhóm, chủng loại hàng hóa';

    columns = [
        {
            title: 'Mã nhóm',
            propName: 'inventoryItemCategoryCode',
            width: 2,
            sort: true,
            filter: true
        },
        {
            title: 'Tên nhóm',
            propName: 'inventoryItemCategoryName',
            width: 3,
            sort: true,
            filter: true
        },
        {
            title: 'Mô tả',
            propName: 'inventoryItemCategoryDescription',
            width: 3,
            sort: true,
            filter: true
        },
        {
            title: 'Nhóm cha',
            propName: 'parent.inventoryItemCategoryName',
            width: 2,
            sort: true,
            filter: true
        }
    ];

    actions = {
        add: 'itemCategoryAdd',
        clone: 'itemCategoryAdd',
        edit: 'itemCategoryEdit'
    };

    mainService;

    constructor(
        private router: Router,
        private itemCategoryService: ItemCategoryService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService
    ) {
        overlay.defaultViewContainer = vcRef;
        this.mainService = itemCategoryService;
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