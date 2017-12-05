import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { routerTransition } from '../../app.animation';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from "../../models/transaction";

@Component({
    selector: 'im-transaction-request-list',
    templateUrl: './app/components/transaction-request/transaction-request-list.component.html',
    styleUrls: ['./app/components/transaction-request/transaction-request-list.component.css'],
    providers: [TransactionService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class TransactionRequestListComponent implements OnInit {
    pageName = "Đề nghị nhập, xuất, chuyển"
    columns = [
        {
            title: 'Ngày',
            propName: 'transactionTime',
            displayMethod: 'transactionTimeDisplay',
            width: 1,
            sort: true,
            filter: false
        },
        {
            title: 'Số',
            propName: 'transactionNo',
            displayMethod: '',
            width: 2,
            sort: true,
            filter: true
        },
        {
            title: 'Loại',
            propName: 'transactionType',
            displayMethod: 'transactionTypeDisplay',
            width: 2,
            sort: true,
            filter: false
        },
        {
            title: 'Đối tượng',
            propName: 'stakeholder.stakeholderName',
            displayMethod: '',
            width: 3,
            sort: true,
            filter: true
        },
        {
            title: 'Trạng thái',
            propName: 'isRecorded',
            displayMethod: 'isRecordedDisplay',
            width: 2,
            sort: true,
            filter: false
        },
        // {
        //     title: 'Tổng tiền',
        //     propName: 'transactionAmount',
        //     displayMethod: 'transactionAmountDisplay',
        //     width: 2,
        //     sort: true,
        //     filter: false
        // }
    ];

    data: any[];
    checkedBoxs = 0;
    isCheckedAll = false;
    searchTerms = {};
    sort = {};
    paginationData = {
        total: 0,
        totalPage: 0,
        currentPage: 0
    };
    paramObject = {
        filter: {},
        sort: {}
    };

    constructor(
        private router: Router,
        private transactionService: TransactionService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        this.fetchData();
    }

    // -------------------------------------
    // Call service methods
    fetchData(parameters: any = { filter: {}, sort: {} }, page?: number, limit?: number) {
        let _page = page || this.paginationData.currentPage;
        if (this.isDefaultParam(this.paramObject) && this.isDefaultParam(parameters)) {
            return this.transactionService.get(_page, limit).then(
                result => {
                    this.changeData(result);
                },
                error => console.log(error)
            );
        } else {
            let _param = (this.isDefaultParam(parameters)) ? this.paramObject : parameters;
            return this.transactionService.query(_param, _page, limit).then(
                result => this.changeData(result),
                error => console.log(error)
            );
        }
    }

    private changeData(result) {
        this.data = result.data;
        this.paginationData['total'] = +result.meta.total;
        this.paginationData['totalPage'] = +result.meta.total_page;

        this.paginationData['currentPage'] = +result.meta.current_page;
        if (this.paginationData['currentPage'] > this.paginationData['totalPage']) {
            this.paginationData['currentPage'] = this.paginationData['totalPage'];
            this.turnPage(this.paginationData['currentPage']);
        }

        this.isCheckedAll = false;
    }

    // -------------------------------------
    // Utility Methods
    isDefaultParam(object): boolean {
        let defaultParam = {
            filter: {},
            sort: {}
        };

        return (JSON.stringify(defaultParam) == JSON.stringify(object));
    }

    getProp(item, path, first?: boolean) {
        let props = path.split('.');
        let current = item;

        try {
            for (let i = 0; i < props.length; i++) {
                if (current == undefined || current == 'undefined') {
                    return '';
                }
                else if (current[props[i]] == undefined || current[props[i]] == 'undefined') {
                    return '';
                }
                else {
                    current = current[props[i]];
                    if (first && Object.prototype.toString.call(current) === '[object Array]') {
                        current = current[0];
                    }
                }
            }
        }
        catch (e) {
            //console.log(e);
            return 'Lỗi truy xuất';
        }

        return current;
    }

    // -------------------------------------
    // Data actions
    delete(object) {
        event.stopPropagation();
        this.transactionService.delete(object)
            .then(result => {
                if (result) {
                    this.fetchData();
                }
            });
    }

    deleteItems(objectList: any[]) {
        objectList.forEach((elm, index) => {
            this.delete(elm);
        });
    }

    // -------------------------------------
    // Common actions
    callDataAction(action: string, object: any = {}) {
        // let inputs = this.dfs.getInputs(action);
        // //let title = (object.stock_name) ? this.dfs.getTitle(action) + object.stock_name : this.dfs.getTitle(action);
        // let title = this.dfs.getTitle(action);
        // let submit = this.dfs.getSubmit(action);
        // let service = this.dfs.getService(action);
        // let dialog = this.modal.open(
        //     IMModal,
        //     overlayConfigFactory(
        //         { title, inputs, submit, service, valueDictionary: object },
        //         BSModalContext
        //     )
        // );

        // dialog.then(resultPromise => {
        //     return resultPromise.result
        //         .then(result => {
        //             this.fetchData();
        //             console.log(result);
        //         }, () => console.log('Rejected')
        //         );
        // });
    }

    record(transaction: Transaction, record: boolean) {
        this.transactionService
            .record(transaction.transactionId, record)
            .then(
            result => {
                this.fetchData();
            },
            error => {
                console.log(error);
            }
        );
    }

    add() {
        //this.callDataAction(this.actions['add']);
    }

    edit(object) {
        //this.callDataAction(this.actions['edit'], object);
    }

    clone(object) {
        //this.callDataAction(this.actions['add'], object);
    }

    turnPage(page) {
        this.fetchData(this.paramObject, page);
    }

    onFilter(event) {
        if (event.target.value) {
            this.searchTerms[event.target.name] = event.target.value;
        } else {
            delete this.searchTerms[event.target.name];
        }
        this.paramObject['filter'] = this.searchTerms;
        this.paginationData.currentPage = 1;
        this.fetchData();
    }

    onBulkAction(event) {
        let action = event.target.value;
        let targets = this.data.filter(this.isChecked);
        if (targets.length > 0) {
            switch (action) {
                case 'delete':
                    let dialog = this.modal.confirm()
                        .title('Xác nhận xóa')
                        .showClose(true)
                        .size('sm')
                        .body('Bạn có đồng ý xóa các đối tượng đã chọn')
                        .open();

                    dialog.then(resultPromise => {
                        return resultPromise.result
                            .then(result => {
                                this.deleteItems(targets);
                            }, () => console.log('Rejected')
                            );
                    });

                    break;

                default:
                    break;
            }
        } else {
            let dialog = this.modal.confirm()
                .title('Không hợp lệ')
                .showClose(true)
                .size('sm')
                .body('Bạn cần chọn ít nhất một đối tượng để xử lý')
                .open();
        }
        event.target.options[0].selected = "selected";
    }

    onSortClick(event) {
        if (!this.sort[event.target.id]) {
            this.sort = {};
        }

        if (event.target.classList.contains('descending-sort')) {
            event.target.classList.remove('descending-sort');
            this.sort[event.target.id] = -1;
        } else {
            event.target.classList.add('descending-sort');
            this.sort[event.target.id] = 1;
        }

        this.paramObject.sort = this.sort;
        this.fetchData();
    }

    onCheck() {
        let check = 0;
        this.data.forEach(function (el, idx) {
            check += ((<any>el).checked) ? 1 : 0;
        });
        this.isCheckedAll = (check == this.data.length);
    }

    checkAll(event) {
        let check = event.target.checked;
        this.data.forEach(function (el, idx) {
            (<any>el).checked = check;
        });
    }

    onCheckRow(row) {
        row.checked = !row.checked;
        this.onCheck();
    }

    isChecked(object: any) {
        return object.checked;
    }

    // -------------------------------------
    // Display methods
    display(item, col) {
        if (col['displayMethod']) {
            return this[col['displayMethod']](item, this.getProp(item, col.propName, true));
        } else {
            return this.getProp(item, col.propName, true);
        }
    }

    transactionTimeDisplay(item, value) {
        let time = new Date(value);
        let date = time.getDate();
        let month = time.getMonth() + 1;
        let year = time.getFullYear();
        let timeString = ('0' + date).toString().slice(-2) + '/' + ('0' + month).toString().slice(-2) + '/' + year;
        return timeString;
    }

    transactionTypeDisplay(item, value) {
        let refObj = {
            '1': {
                'text': 'Nhập kho'
            },
            '2': {
                'text': 'Xuất kho'
            },
            '3': {
                'text': 'Chuyển kho'
            }
        }
        return refObj[value]['text'];
    }

    isRecordedDisplay(item, value) {
        let refObj = {
            'true': {
                'text': 'Đã ghi sổ'
            },
            'false': {
                'text': 'Chưa ghi sổ'
            }
        }
        if (refObj[value.toString()]) {
            return refObj[value.toString()]['text'];
        } else {
            return 'Chưa ghi sổ';
        }
    }

    transactionAmountDisplay(item, value) {
        if (item['transactionDetails']) {
            let amount = 0;
            item['transactionDetails'].forEach(elm => {
                let price = +elm['price'];
                let quantity = +elm['quantity'];
                amount += price * quantity;
            })
            return amount;
        } else {
            return 0;
        }
    }
}