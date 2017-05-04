import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { IMModal } from '../modal/im-modal.component';

import { routerTransition } from '../../app.animation';
import { InputControlService } from '../../services/input-control.service';
import { DynamicFormService } from '../../services/form.services';
import { ItemService } from '../../services/item.service';
import { StakeholderService } from '../../services/stakeholder.service';
import { TransactionService } from '../../services/transaction.service';
declare var jQuery: any;

@Component({
    selector: 'im-transaction',
    templateUrl: './app/components/transaction/transaction.component.html',
    styleUrls: [
        './app/components/transaction/transaction.component.css'
    ],
    providers: [DynamicFormService, ItemService, TransactionService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class TransactionComponent implements OnInit, OnDestroy {
    pageName = 'Lập phiếu';
    loaded = true;
    isEditPage = false;
    testData;

    //input model
    //stakehodler
    stakeholder;
    stakeholderName;
    stakeholderServiceClass = StakeholderService;

    //order value
    timeValue: Date;

    //order detail data
    orderDetailData;

    description;



    transcationTypeForm: FormGroup = new FormGroup(
        {
            transactionType: new FormControl()
        }
    );

    callDataAction(action: string, object: any = {}) {
        let inputs = this.dfs.getInputs(action);
        //let title = (object.stock_name) ? this.dfs.getTitle(action) + object.stock_name : this.dfs.getTitle(action);
        let title = this.dfs.getTitle(action);
        let submit = this.dfs.getSubmit(action);
        let service = this.dfs.getService(action);
        let dialog = this.modal.open(
            IMModal,
            overlayConfigFactory(
                { title, inputs, submit, service, valueDictionary: object },
                BSModalContext
            )
        );

        dialog.then(resultPromise => {
            return resultPromise.result
                .then(result => {

                }, () => console.log('Rejected')
                );
        });
    }

    add() {
        this.callDataAction('stakeholderAdd');
    }

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        private ics: InputControlService,
        private dfs: DynamicFormService,
        private service: ItemService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private transactionService: TransactionService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    test() {
        let obj = {
            'basic': {
                'transactionType': this.getTransactionType(),
                'stakeholder': this.stakeholder,
                'description': this.description,
                'time': ((new Date(this.timeValue).getTime()) / 1000)
            },
            'detail': this.cleanOrderDetailData(this.orderDetailData)
        }
        console.log(obj);
        this.transactionService.save(obj).then(
            error => console.log(error),
            result => console.log(result)
        )
    }

    submit(event) {
        let actionId = event.target.id;
        let obj = {
            'basic': {
                'transactionType': this.getTransactionType(),
                'stakeholder': this.stakeholder,
                'description': this.description,
                'time': ((new Date(this.timeValue).getTime()) / 1000),
                'isRecorded': (actionId == 'save-record')
            },
            'detail': this.cleanOrderDetailData(this.orderDetailData)
        }
        console.log(obj);

        // this.transactionService.save(obj).then(
        //     result => {
        //         if (result['success']) {
        //             let dialog = this.modal.alert()
        //                 .size('sm')
        //                 .showClose(true)
        //                 .title('Thông báo')
        //                 .body(`Đã lưu thành công`)
        //                 .open();

        //             dialog.then(dialogResult => {
        //                 dialogResult.result.then(
        //                     () => {
        //                         this.afterSubmit(true);
        //                     },
        //                     () => {
        //                         this.afterSubmit(true);
        //                     }
        //                 )
        //             })
        //         } else {
        //             let dialog = this.modal.alert()
        //                 .size('sm')
        //                 .showClose(true)
        //                 .title('Lỗi')
        //                 .body(`Vui lòng kiểm tra lại các thông tin đã nhập`)
        //                 .open()
        //             dialog.then(dialogResult => {
        //                 dialogResult.result.then(
        //                     () => {
        //                         this.afterSubmit(false);
        //                     },
        //                     () => {
        //                         this.afterSubmit(false);
        //                     }
        //                 )
        //             })
        //         }
        //     },
        //     error => {
        //         console.log(error);
        //         this.afterSubmit(false);
        //     }
        // );
    }

    afterSubmit(success) {
        if (success) {
            setTimeout(() => {
                this.router.navigate(['management', 'transaction']);
            }, 700)
        }
    }

    cleanOrderDetailData(data) {
        let attrs = [
            'item',
            'stock',
            'unit',
            'quantity',
            'price',
            'lotNo'
        ];
        let _data = [];
        data.forEach((elm) => {
            let _elm = this.cleanObject(elm, attrs);
            _data.push(_elm);
        });
        return _data;
    }

    cleanObject(object: any, attrs: string[]) {
        let _object = {};
        Object.keys(object).forEach((elm) => {
            if (attrs.indexOf(elm) >= 0) {
                _object[elm] = object[elm];
            }
        });
        return _object;
    }

    isTransactionTypeChecked() {
        return !(this.transcationTypeForm.value['transactionType'] == null)
    }

    getTransactionType(): string {
        return this.transcationTypeForm.value['transactionType'];
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    ngAfterViewInit() {

    }

    back() {

    }

    _log(m) {
        console.log(m);
    }
}