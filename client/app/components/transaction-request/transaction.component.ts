import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy, DoCheck } from '@angular/core';
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
import { IMFormDropdownComponent } from '../input/im-form-dropdown.component';
import { TransactionDetailComponent } from '../transaction/transaction-detail.component';
import { Transaction } from "../../models/transaction";
declare var jQuery: any;

const TRANSACTION_TYPE_NAME = {
    1: 'Phiếu nhập kho',
    2: 'Phiếu xuất kho',
    3: 'Phiếu chuyển kho',
}

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

export class TransactionComponent implements OnInit, OnDestroy, DoCheck {
    @ViewChild('dropdownStakeholder') dropdownStakeholder: IMFormDropdownComponent;
    @ViewChild('imTransactionDetail') imTransactionDetail: TransactionDetailComponent;
    pageName = 'Lập phiếu';
    loaded = true;
    isEditPage = false;
    testData;

    //input model
    //stakehodler
    stakeholder;
    stakeholderName;
    stakeholderServiceClass = StakeholderService;

    //transaction value
    timeValue: Date;
    isRecorded: boolean;

    //transaction detail data
    transactionId;
    orderDetailData;
    description;
    transactionDetailData;
    transactionType;
    transactionNo;
    lastTransactionType;

    //edit
    private sub: any;
    private mode;

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

    ngOnInit() {
        this.mode = 'create';
        this.sub = this.activedRoute.params.subscribe(params => {
            let _id = params['_id'];
            if (_id) {
                this.mode = 'edit';
                this.isEditPage = true;
                this.transactionService.getById(_id)
                    .then(
                    result => {
                        if (result.success && result.data) {
                            let tempTransaction = <Transaction>result.data;
                            this.transactionType = tempTransaction.transactionType;
                            this.pageName = TRANSACTION_TYPE_NAME[+this.transactionType];
                            this.description = tempTransaction.transactionDescription;
                            this.timeValue = new Date(tempTransaction.transactionTime);
                            this.transactionNo = tempTransaction.transactionNo;
                            this.transactionId = tempTransaction.transactionId;
                            this.transactionDetailData = (<any>tempTransaction).transactionDetailData;
                            this.isRecorded = tempTransaction.isRecorded;
                            if (tempTransaction.stakeholder.length > 0) {
                                this.stakeholder = tempTransaction.stakeholder[0]['stakeholderId'];
                                this.stakeholderName = tempTransaction.stakeholder[0]['stakeholderName'];
                            }
                            this.imTransactionDetail.initData((<any>tempTransaction).transactionDetailData);
                            this.imTransactionDetail.changeType(tempTransaction.transactionType);
                        }
                    },
                    error => console.log(error)
                    )
            } else {
                // this.inputs = this.dfs.getInputs('itemBasicInfoBlank');
                // this.form = this.ics.toFormGroup(this.inputs);
                this.loaded = true;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngDoCheck() {
        if (this.transactionType != this.lastTransactionType && this.mode == 'create') {
            this.lastTransactionType = this.transactionType;
            this.resetInput();
        }
    }

    ngAfterViewInit() {

    }

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

    test() {
        // let obj = {
        //     'basic': {
        //         'transactionId': this.transactionId,
        //         'transactionType': this.getTransactionType(),
        //         'stakeholder': this.stakeholder,
        //         'description': this.description,
        //         'time': ((new Date(this.timeValue).getTime()) / 1000)
        //     },
        //     'detail': this.cleanOrderDetailData(this.orderDetailData)
        // }
        // console.log(obj);
        // this.transactionService.save(obj).then(
        //     error => console.log(error),
        //     result => console.log(result)
        // )
    }

    resetInput() {
        if (this.dropdownStakeholder) {
            this.dropdownStakeholder.cancelSelection();
        }
        this.description = '';
        this.timeValue = null;
        let _deleteList = this.orderDetailData.slice();
        this.imTransactionDetail.deleteItems(_deleteList);
        this.imTransactionDetail.changeType(this.transactionType);
    }

    submit(event) {
        let actionId = event.target.id;
        let obj = {
            'basic': {
                'transactionId': this.transactionId,
                'transactionType': this.getTransactionType(),
                'stakeholder': this.stakeholder,
                'description': this.description,
                'time': ((new Date(this.timeValue).getTime()) / 1000),
                'isRecorded': (actionId == 'save-record' || this.isRecorded)
            },
            'detail': this.cleanOrderDetailData(this.orderDetailData)
        }
        console.log(obj);

        this.transactionService.save(obj).then(
            result => {
                if (result['success']) {
                    let dialog = this.modal.alert()
                        .size('sm')
                        .showClose(true)
                        .title('Thông báo')
                        .body(`Đã lưu thành công`)
                        .open();

                    dialog.then(dialogResult => {
                        dialogResult.result.then(
                            () => {
                                this.afterSubmit(true);
                            },
                            () => {
                                this.afterSubmit(true);
                            }
                        )
                    })
                } else {
                    let dialog = this.modal.alert()
                        .size('sm')
                        .showClose(true)
                        .title('Lỗi')
                        .body(`Vui lòng kiểm tra lại các thông tin đã nhập`)
                        .open()
                    dialog.then(dialogResult => {
                        dialogResult.result.then(
                            () => {
                                this.afterSubmit(false);
                            },
                            () => {
                                this.afterSubmit(false);
                            }
                        )
                    })
                }
            },
            error => {
                console.log(error);
                this.afterSubmit(false);
            }
        );
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
            'id',
            'item',
            'stock',
            'secondStock',
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

    isReadOnlyMode() {
        return (!this.isTransactionTypeChecked() && !this.isEditPage)
            || (this.isRecorded);
    }

    isTransactionTypeChecked() {
        return !(this.transcationTypeForm.value['transactionType'] == null)
    }

    getTransactionType(): string {
        return this.transcationTypeForm.value['transactionType'];
    }

    back() {

    }

    _log(m) {
        console.log(m);
    }
}