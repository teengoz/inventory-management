import { Component, OnInit, Input, Output, AfterViewInit, ViewContainerRef, ViewChild, ElementRef, EventEmitter, DoCheck, HostListener } from '@angular/core';
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
import { StockService } from '../../services/stock.service';

@Component({
    selector: 'im-transaction-detail-table',
    templateUrl: './app/components/transaction/transaction-detail-table.component.html',
    styleUrls: [
        './app/components/transaction/transaction-detail.component.css',
        './app/components/transaction/transaction-detail-table.component.css'
    ],
    providers: [DynamicFormService],
    host: { '(document:click)': 'onClick($event)' }
})

export class TransactionDetailTableComponent implements OnInit, DoCheck, AfterViewInit {
    // -------------------------------------
    // Communicate Variables
    @Input() ownerId;
    @Input() initialData;
    @Input() data;
    @Input() typeKey;
    @Output() dataChange = new EventEmitter();

    // -------------------------------------
    // Self Variables
    deletedList: any[] = [];
    loaded = false;
    currentEditingRow = -1;
    stockServiceClass = StockService;

    // -------------------------------------
    // Supporting Variables
    _debugHide = false;

    //Resize table columns
    @ViewChild('table') private table: ElementRef;
    fixedCol = [];
    colWidth = [];
    minWidth = 130;

    px: number;
    width: number;
    draggingCorner: boolean;
    left = 0;
    beforeWidth = 0;
    lastOffset = 0;
    lastWindowsWidth = 0;
    _columns = [3, 1.2, 0.8, 0.8, 1.2, 1.6, 1.4];

    columnSetting = [
        {
            initialColumnWidth: [3, 1.2, 0.8, 0.8, 1.2, 1.6, 1.4],
            initialTableWidth: 1,
            type: 'external',
            fixedCol: [0],
        },
        {
            initialColumnWidth: [2.8, 1, 1, 0.8, 0.8, 1, 1.4, 1.2],
            initialTableWidth: 1.2,
            type: 'internal',
            fixedCol: [0]
        }
    ]

    constructor(
        private router: Router,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService,
        private http: Http,
        private genHeader: GenerateHeader,
        private _eref: ElementRef
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        // if (this.initialData) {
        //     this.fetchData();
        // }
        this.fixedCol = this.columnSetting[+this.typeKey]['fixedCol'];
    }

    ngAfterViewInit() {
        this.initWidth();
    }

    ngDoCheck() {
        this.dataChange.emit(this.data);
    }

    // -------------------------------------
    // Call service methods


    // -------------------------------------
    // Common actions
    cancelEditing() {
        if (this.currentEditingRow != -1) {
            let index = this.findIndexOfLocalId(this.data, this.currentEditingRow);
            if (this.data[index]) {
                //this.data[index]['stock'] = (this.currentStock && this.currentStock['stockId']) ? this.currentStock['stockId'] : '';
                //this.data[index]['stockName'] = (this.currentStock && this.currentStock['stockName']) ? this.currentStock['stockName'] : '';
                //this.data[index]['unit'] = this.currentUnit;
                //this.data[index]['price'] = this.currentPrice;
                //this.data[index]['quantity'] = this.currentQuantity;
                // let conversionRate = 1;
                // if (this.data[index]['unit'] != this.data[index]['baseUnit']) {
                //     conversionRate = 2;
                // }
                this.data[index]['amount'] = ((+this.data[index]['price']) * (+this.data[index]['quantity'])) || 0;
                //this.data[index]['note'] = this.currentNote;
                //console.log(this.data[index]);
            }
            this.currentEditingRow = -1;
        }
    }

    //Haldle outsite click event
    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.cancelEditing();
        }
    }

    edit(object) {
        //let index = this.findIndexOfLocalId(this.data, object['_localId']);
        setTimeout(() => {
            this.currentEditingRow = object['_localId'];
        }, 100)
    };

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
        return this.removeLocalFields(this.data, ['_localId', '_isEditing']);
    }

    resetInputData() {
        if (this.initialData) {
            this.data = this.initialData;
        } else {
            this.data = [];
        }
        console.log('reset');
    }

    private removeLocalFields(data, fields) {
        let _data = data;
        for (let i = 0; i < _data.length; i++) {
            fields.forEach(elm => {
                if (_data[i][elm]) {
                    delete _data[i][elm];
                }
            });
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
            if (object['id']) {
                this.deletedList.push(object['id']);
            }
        }
    }

    deleteItems(objectList: any[]) {
        for (let i = 0; i < objectList.length; i++) {
            this.delete(objectList[i]);
        }
    }

    // -------------------------------------
    // Resizable data table
    // columnSetting = [
    //     {
    //         initialColumnWidth: [3, 1.2, 0.8, 0.8, 1.2, 1.6, 1.4],
    //         initialTableWidth: 1,
    //         type: 'external',
    //         fixedCol: [0],
    //     },
    //     {
    //         initialColumnWidth: [2.8, 1, 1, 0.8, 0.8, 1, 1.4, 1.2],
    //         initialTableWidth: 1.2,
    //         type: 'internal',
    //         fixedCol: [0]
    //     }
    // ]
    initWidth() {
        // console.log(this.table.nativeElement.parentNode.clientWidth);
        // console.log('2: ', this.typeKey);
        // console.log(this.columnSetting[+this.typeKey]['initialTableWidth']);
        // console.log(this.table.nativeElement.parentNode.clientWidth
        //     * this.columnSetting[+this.typeKey]['initialTableWidth']
        //     - 51);
        // console.log('----------------------------');
        this.lastWindowsWidth = window.innerWidth;
        let fullWidth = this.table.nativeElement.parentNode.clientWidth
            * this.columnSetting[+this.typeKey]['initialTableWidth']
            - 51;
        this.table.nativeElement.style.width = fullWidth;
        let iniColWidth = this.columnSetting[+this.typeKey]['initialColumnWidth'];
        for (let i = 0; i < iniColWidth.length; i++) {
            if (iniColWidth[i]) {
                this.colWidth[i + 1] = (+iniColWidth[i] / 10) * fullWidth;
            }
        }
        let thList = this.table.nativeElement.querySelectorAll('th');
        this.colWidth[0] = 50;
        for (let i = 0; i < thList.length; i++) {
            if (!this.colWidth[i]) {
                this.colWidth[i] = thList[i].clientWidth;
            }
        }
        // console.log("Real fullwidth: ", this.table.nativeElement.parentNode.clientWidth);
        // console.log("Fullwidth: ", fullWidth);
        // console.log("Table width: ", this.getTableWidth());
        // console.log("Col width: ", this.colWidth);
    }

    getTableWidth() {
        let width = 0;
        for (let i = 0; i < this.colWidth.length; i++) {
            width += +this.colWidth[i];
        }
        return width;
    }

    onResizeEdgeClick(event, left) {
        this.beforeWidth = event.target.parentNode.clientWidth;
        this.table.nativeElement.style.cursor = 'col-resize !important';
        this.draggingCorner = true;
        this.px = event.clientX;
        this.left = left;
        event.preventDefault();
        event.stopPropagation();
    }

    resize(left, offset) {
        if (left > -1 && this.fixedCol.indexOf(+left) < 0) {
            this.colWidth[left] = ((this.beforeWidth + offset) < this.minWidth) ? this.minWidth : this.beforeWidth + offset;
        }
    }

    @HostListener('document:mousemove', ['$event'])
    onCornerMove(event: MouseEvent) {
        if (!this.draggingCorner) {
            return;
        }
        let offset = event.clientX - this.px;
        this.lastOffset = offset;
        this.resize(this.left, offset);
    }

    @HostListener('document:mouseup', ['$event'])
    onCornerRelease(event: MouseEvent) {
        if (this.draggingCorner) {
            this.draggingCorner = false;
            this.left = 0;
            this.beforeWidth = 0;
            // console.log(this.colWidth);
            // console.log(this.table.nativeElement.clientWidth);
            // console.log(this.lastOffset);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth != this.lastWindowsWidth &&
            ((event.target.innerWidth - 420) * (this.lastWindowsWidth - 420)) < 0
        ) {
            this.initWidth();
            // console.log('INIT WIDTH')
        }
    }

    // -------------------------------------
    // Trash
    // getLabel(array, value, valueField, labelField) {
    //     for (let i = 0; i < array.length; i++) {
    //         let elm = array[i];
    //         if (elm[valueField] == value) {
    //             return elm[labelField];
    //         }
    //     }
    //     return '';
    // }

    // changeStock(event) {
    //     // let index = this.findIndexOfLocalId(this.data, this.currentEditingRow);
    //     // this.data[index]['stock'] = event['stockId'];
    //     // this.data[index]['stockName'] = event['stockName'];
    // }

    // callDataAction(action: string, object: any = {}, callback) {
    //     let inputs = this.dfs.getInputs(action);
    //     let title = this.dfs.getTitle(action);
    //     let submit = this.dfs.getSubmit(action);
    //     let service = this.dfs.getService(action);
    //     let dialog = this.modal.open(
    //         IMModal,
    //         overlayConfigFactory(
    //             { title, inputs, submit, service, valueDictionary: object },
    //             BSModalContext
    //         )
    //     );

    //     dialog.then(resultPromise => {
    //         return resultPromise.result
    //             .then(result => {
    //                 callback(result);
    //             }, () => console.log('Rejected')
    //             );
    //     });
    // }    

    // fetchData() {
    //     for (let i = 0; i < this.initialData.length; i++) {
    //         let newId = new Date().getTime().toString();
    //         this.data[i] = this.initialData[i];
    //         this.data[i]['_localId'] = newId;
    //     }
    // }
}