import { Component, OnInit, Input, Output, ViewContainerRef, ViewChild, DoCheck, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';
import { GenerateHeader } from '../../services/generate-header';
import { ItemService } from '../../services/item.service';
import { StockService } from '../../services/stock.service';

@Component({
    selector: 'im-order-detail',
    templateUrl: './app/components/order-detail/order-detail.component.html',
    styleUrls: ['./app/components/order-detail/order-detail.component.css'],
    providers: [StockService, DynamicFormService],
})

export class OrderDetailComponent implements OnInit, DoCheck {
    // -------------------------------------
    // Communicate Variables
    @Input() pageName;
    @Input() ownerId;
    @Input() columns;
    @Input() options;
    @Input() actions;
    @Input() data;
    @Output() dataChange = new EventEmitter();

    // -------------------------------------
    // Self Variables
    _data: any[] = [];
    deletedList: any[] = [];
    editingRows: any[] = [];
    inputs: InputBase<any>[];
    loaded = false;

    // -------------------------------------
    // Supporting Variables
    checkedBoxs = 0;
    isCheckedAll = false;

    // -------------------------------------
    // Temporary Variables
    _options = [
        '123', '456', '789', '3dfg'
    ];
    queryService = ItemService;
    _stockService = StockService;


    constructor(
        private router: Router,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService,
        private http: Http,
        private genHeader: GenerateHeader,
        private stockService: StockService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        if (this.data) {
            this.fetchData();
        }
    }

    ngDoCheck() {
        this.data = this._data;
        this.dataChange.emit(this.data);
        if (this.data && !this.loaded) {
            console.log('DO CHECK');
            this.fetchData();
            this.loaded = true;
        }
    }

    submitSeletion(event) {
        let newId = new Date().getTime().toString();
        let conversionUnits = JSON.parse(event['inventoryItemConversionUnit']);
        let unitList = [event['inventoryItemBaseUnit']];
        let unitConversionRates = {};
        conversionUnits.forEach(elm => {
            if (elm) {
                unitList.push(elm['inventoryItemUnitConversionName']);
                //unitConversionRates[elm['inventoryItemUnitConversionName']] = elm['inventoryItemUnitConversionRate'];
            }
        });
        this.stockService.search().then(
            result => {
                let stockList = result.data;
                let selection = {
                    '_localId': newId,
                    '_isEditing': false,
                    'item': event['inventoryItemId'],
                    'itemCode': event['inventoryItemCode'],
                    'itemName': event['inventoryItemName'],
                    'stock': '',
                    'stockList': stockList,
                    'baseUnit': event['inventoryItemBaseUnit'],
                    'unit': event['inventoryItemBaseUnit'],
                    'unitList': unitList,
                    'quantity': 0,
                    'price': 0,
                    'amount': 0,
                    'lotNo': '',
                    'note': ''
                }
                this._data.push(selection);
            },
            error => console.log(error)
        );
    }

    testClick(object) {
        let index = this.findIndexOfLocalId(this._data, object['_localId']);
        if (!this._data[index]['_isEditing']) {
            this._data[index]['_isEditing'] = true;
        }
    }

    // -------------------------------------
    // Call service methods
    fetchData() {
        for (let i = 0; i < this.data.length; i++) {
            let newId = new Date().getTime().toString();
            this._data[i] = this.data[i];
            this._data[i]['_localId'] = newId;
        }
    }


    // -------------------------------------
    // Common actions
    callDataAction(action: string, object: any = {}, callback) {
        let inputs = this.dfs.getInputs(action);
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
                    callback(result);
                }, () => console.log('Rejected')
                );
        });
    }

    add() {
        this.getDictionary();
        this.callDataAction(this.actions['add'], {}, (result) => {
            let newId = new Date().getTime().toString();
            let _result = result;
            _result['_localId'] = newId;
            this._data.push(_result);
        });
    }

    edit(object) {
        this.callDataAction(this.actions['edit'], object, (result) => {
            let index = this.findIndexOfLocalId(this._data, object['_localId']);
            this._data[index] = result;
        });
    }

    clone(object) {
        this.callDataAction(this.actions['clone'], object, (result) => {
            let newId = new Date().getTime().toString();
            let _result = result;
            _result['_localId'] = newId;
            this._data.push(_result);
        });
    }

    onBulkAction(event) {
        let action = event.target.value;
        let targets = this._data.filter(this.isChecked);
        if (targets.length > 0) {
            switch (action) {
                case 'delete':
                    let dialog = this.modal.confirm()
                        .title('Xác nhận xóa')
                        .showClose(true)
                        .size('sm')
                        .body('Bạn có đồng ý xóa các Kho đã chọn')
                        .open();

                    dialog.then(resultPromise => {
                        return resultPromise.result
                            .then(result => {
                                this.deleteItems(targets);
                                this.isCheckedAll = false;
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
        let field = event.target.id;
        let order = 1;

        if (event.target.classList.contains('descending-sort')) {
            event.target.classList.remove('descending-sort');
            order = -1;
        } else {
            event.target.classList.add('descending-sort');
            order = 1;
        }

        this._data.sort((a, b) => {
            if (a[field] < b[field]) return -1 * order;
            if (a[field] > b[field]) return 1 * order;
            return 0;
        });
    }

    onCheck() {
        let check = 0;
        this._data.forEach(function(el, idx) {
            check += ((<any>el).checked) ? 1 : 0;
        });
        this.isCheckedAll = (check == this._data.length);
    }

    checkAll(event) {
        let check = event.target.checked;
        this._data.forEach(function(el, idx) {
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
    // Utility methods
    private generateVirtual(item) {
        Object.keys(item).forEach((key) => {
            if (key.indexOf('.') > -1) {
                let keyArray = key.split('.');
                let keyLevel1 = keyArray[0];
                let keyLevel2 = keyArray[1];
                item[keyLevel1] = {};
                item[keyLevel1][keyLevel2] = item[key];
            }
        });
        return item;
    }

    private getDictionary() {
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i]['dictionaryService']) {
                let keyName = this.columns[i]['dictKey'];
                let valueName = this.columns[i]['dictValue'];
                let dict = {};
                let serviceInstance = new this.columns[i]['dictionaryService'](this.http, this.genHeader);
                serviceInstance['hint']().then(
                    result => {
                        let _data = result.data || [];
                        _data.forEach((elm) => {
                            let _keyVal = elm[keyName];
                            let _valueVal = elm[valueName];
                            dict[_keyVal] = _valueVal;
                        });
                        this.columns[i]['dictionary'] = dict;
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        }
    }

    getProp(item, path, dictionary, first?: boolean) {
        let props = path.split('.');
        let current = item;

        try {
            if (current[path] && Object.prototype.toString.call(current[path]) === '[object String]') {
                current = current[path]
            } else {
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
        }
        catch (e) {
            return 'Lỗi truy xuất';
        }

        if (current && dictionary) {
            current = dictionary[current];
        }

        return current;
    }

    findIndexOfLocalId(array, localId): number {
        let _idx = undefined;
        for (let i = 0; i < array.length; i++) {
            let elm = array[i];
            if (elm['_localId'] && elm['_localId'] == localId) {
                _idx = i
                return i;
            }
        }
        return undefined;
    }

    getElementByLocalId(array, localId) {
        let index = this.findIndexOfLocalId(array, localId);
        if (index >= 0) {
            return array[index];
        } else {
            return undefined;
        }
    }

    getData() {
        return this.removeLocalId(this._data);
    }

    resetInputData() {
        if (this.data) {
            this._data = this.data;
        } else {
            this._data = [];
        }
    }

    private removeLocalId(data) {
        let _data = data;
        for (let i = 0; i < _data.length; i++) {
            if (_data[i]['_localId']) {
                delete _data[i]['_localId'];
            }
        }
        return _data;
    }

    _log(data) {
        console.log('-------log--------');
        console.log(data);
        console.log('------------------');
    }

    // -------------------------------------
    // Data actions
    delete(object) {
        event.stopPropagation();
        let _deletedId = object['_localId'];
        let _index = this.findIndexOfLocalId(this._data, _deletedId);
        if (_index >= 0) {
            this._data.splice(_index, 1);
            if (object['_id']) {
                //this.deletedList.push(object);
            }
        }
    }

    deleteItems(objectList: any[]) {
        objectList.forEach((elm, index) => {
            this.delete(elm);
        });
    }
}
