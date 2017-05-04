import { Component, OnInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';

@Component({
    selector: 'im-management-page',
    templateUrl: './app/components/management-page/management-page.component.html',
    styleUrls: ['./app/components/management-page/management-page.component.css'],
    providers: [DynamicFormService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class ManagementPageComponent implements OnInit {
    @ViewChild('dataTable') dataTable: IMTableComponent;
    
    @Input() mainService;
    @Input() columns;
    @Input() actions;
    @Input() pageName;
    @Input() width;

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
    // Utility methods
    getOffset() {
        if (this.width == 12) {
            return 0
        } else {
            return (((12 - this.width) /2 ) || 3);
        }
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