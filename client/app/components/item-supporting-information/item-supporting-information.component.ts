import { Component, OnInit, Input, ViewContainerRef, ViewChild, DoCheck } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

//import { ItemDiscountService } from '../../services/item-discount.service';
import { InputBase } from '../../models/input/input-base';
import { AdditionCalculateWindow } from '../modal/custom-modal-sample.component';
import { IMModal } from '../modal/im-modal.component';
import { IMTableComponent } from '../../components/im-table/im-table.component';
import { DynamicFormService } from '../../services/form.services';
import { GenerateHeader } from '../../services/generate-header';

@Component({
    selector: 'im-item-supporting-information',
    templateUrl: './app/components/item-supporting-information/item-supporting-information.component.html',
    styleUrls: ['./app/components/item-supporting-information/item-supporting-information.component.css'],
    providers: [DynamicFormService],
})

export class ItemSupportingInformationComponent implements OnInit, DoCheck {
    // -------------------------------------
    // Communicate Variables
    @Input() pageName;
    @Input() ownerId;
    @Input() columns;
    @Input() options;
    @Input() actions;
    @Input() initialData;

    // -------------------------------------
    // Self Variables
    data: any[] = [];
    deletedList: any[] = [];
    inputs: InputBase<any>[];
    loaded = false;

    // -------------------------------------
    // Supporting Variables
    checkedBoxs = 0;
    isCheckedAll = false;

    constructor(
        private router: Router,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService,
        private http: Http,
        private genHeader: GenerateHeader
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        if (this.initialData) {
            this.fetchData();
        }
    }

    ngDoCheck() {
        if (this.initialData && !this.loaded) {
            console.log('DO CHECK');
            this.fetchData();
            this.loaded = true;
        }
    }

    // -------------------------------------
    // Call service methods
    fetchData() {
        for (let i = 0; i < this.initialData.length; i++) {
            let newId = new Date().getTime().toString();
            this.data[i] = this.initialData[i];
            this.data[i]['_localId'] = newId;
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
            this.data.push(_result);
        });
    }

    edit(object) {
        this.callDataAction(this.actions['edit'], object, (result) => {
            let index = this.findIndexOfLocalId(this.data, object['_localId']);
            this.data[index] = result;
        });
    }

    clone(object) {
        this.callDataAction(this.actions['clone'], object, (result) => {
            let newId = new Date().getTime().toString();
            let _result = result;
            _result['_localId'] = newId;
            this.data.push(_result);
        });
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

        this.data.sort((a, b) => {
            if (a[field] < b[field]) return -1 * order;
            if (a[field] > b[field]) return 1 * order;
            return 0;
        });
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
        return this.removeLocalId(this.data);
    }

    resetInputData() {
        if (this.initialData) {
            this.data = this.initialData;
        } else {
            this.data = [];
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
        let _index = this.findIndexOfLocalId(this.data, _deletedId);
        if (_index >= 0) {
            this.data.splice(_index, 1);
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