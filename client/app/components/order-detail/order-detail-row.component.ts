import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';
import { GenerateHeader } from '../../services/generate-header';
import { StakeholderTypeService } from '../../services/stakeholder-type.service';

@Component({
    selector: 'im-order-detail-row',
    templateUrl: './app/components/order-detail/order-detail-row.component.html',
    styleUrls: ['./app/components/order-detail/order-detail.component.css'],
    providers: [DynamicFormService],
})

export class OrderDetailRowComponent implements OnInit {
    @Input() item;

    isEditing = false;

    ngOnInit() {

    }
    
    delete(item) {
        console.log('delete');
    }

    edit() {
        this.isEditing = true;
    }
}