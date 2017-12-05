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
import { TransactionDetailTableComponent } from '../../components/transaction/transaction-detail-table.component';

@Component({
    selector: 'im-transaction-detail',
    templateUrl: './app/components/transaction/transaction-detail.component.html',
    styleUrls: ['./app/components/transaction/transaction-detail.component.css'],
    providers: [StockService, DynamicFormService],
})

export class TransactionDetailComponent implements OnInit, DoCheck {
    // -------------------------------------
    // Communicate Variables
    @Input() ownerId;
    @Input() columns;
    @Input() options;
    @Input() actions;
    @Input() data;
    @Input() plainData = [];
    @Output() dataChange = new EventEmitter();
    @ViewChild('imTransactionDetailTable') imTransactionDetailTable: TransactionDetailTableComponent;

    // -------------------------------------
    // Self Variables
    localData: any[] = [];
    deletedList: any[] = [];
    loaded = false;
    typeKey = 0;

    // -------------------------------------
    // Temporary variables
    _options = [
        '123', '456', '789', '3dfg'
    ];

    // -------------------------------------
    // Service Class
    queryServiceClass = ItemService;
    stockServiceClass = StockService;


    constructor(
        private router: Router,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService,
        private http: Http,
        private genHeader: GenerateHeader,
        private stockService: StockService,
        private itemService: ItemService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        //console.log('PLAIN DATA LENGTH', this.plainData.length);
        // if (this.ownerId && this.plainData && this.plainData.length > 0) {
        //     for (let i = 0; i < this.plainData.length; i++) {
        //         this.addInitialItem(this.plainData[i]);
        //     }
        // }
    }

    ngDoCheck() {
        this.data = this.localData;
        this.dataChange.emit(this.data);
    }

    initData(plainData) {
        for (let i = 0; i < plainData.length; i++) {
            this.addInitialItem(plainData[i]);
        }
    }

    testClick(object) {
        let index = this.findIndexOfLocalId(this.localData, object['_localId']);
        if (!this.localData[index]['_isEditing']) {
            this.localData[index]['_isEditing'] = true;
        }
    }

    // -------------------------------------
    // Common methods
    addItemFromDropdown(event) {
        let newId = new Date().getTime().toString();
        let conversionUnits = JSON.parse(event['inventoryItemConversionUnit']);
        let unitList = [event['inventoryItemBaseUnit']];
        let unitConversionRates = {};
        conversionUnits.forEach(elm => {
            if (elm) {
                unitList.push(elm['inventoryItemUnitConversionName']);
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
                    'secondStock': '',
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
                this.localData.push(selection);
            },
            error => console.log(error)
        );
    }

    addInitialItem(item) {
        let newId = new Date().getTime().toString();
        this.itemService.getById(item['inventoryItem'][0]['inventoryItemId']).then(
            result => {
                let inventoryItem = result.data;
                let conversionUnits = JSON.parse(inventoryItem['inventoryItemConversionUnit']);
                let unitList = [inventoryItem['inventoryItemBaseUnit']];
                let unitConversionRates = {};
                conversionUnits.forEach(elm => {
                    if (elm) {
                        unitList.push(elm['inventoryItemUnitConversionName']);
                    }
                });
                this.stockService.search().then(
                    result => {
                        let stockList = result.data;
                        let selection = {
                            '_localId': newId,
                            '_isEditing': false,
                            'id': item['transactionDetailId'],
                            'item': inventoryItem['inventoryItemId'],
                            'itemCode': inventoryItem['inventoryItemCode'],
                            'itemName': inventoryItem['inventoryItemName'],
                            'stock': item['stock'][0]['stockId'],
                            'stockName': item['stock'][0]['stockName'],
                            'secondStock': (item['secondStock'][0]) ? item['secondStock'][0]['stockId'] : '',
                            'secondStockName': (item['secondStock'][0]) ? item['secondStock'][0]['stockName'] : '',
                            'stockList': stockList,
                            'baseUnit': inventoryItem['inventoryItemBaseUnit'],
                            'unit': item['unit'],
                            'unitList': unitList,
                            'quantity': item['quantity'],
                            'price': item['price'],
                            'amount': item['price'] * item['quantity'],
                            'lotNo': item['lotNo']
                        }
                        this.localData.push(selection);
                    },
                    error => console.log(error)
                );

            },
            error => console.log(error)
        );
    }

    changeType(transactionType) {
        if (+transactionType == 3) {
            this.typeKey = 1;
        } else {
            this.typeKey = 0;
        }
        setTimeout(() => {
            this.imTransactionDetailTable.initWidth();
        }, 100);
    }

    // -------------------------------------
    // Call service methods


    // -------------------------------------
    // Utility methods
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
        let resultData = [];
        resultData = this.removeLocalId(this.localData);
        return resultData;
    }

    resetInputData() {
        if (this.data) {
            this.localData = this.data;
        } else {
            this.localData = [];
        }
    }

    private removeLocalId(data) {
        let localData = data;
        for (let i = 0; i < localData.length; i++) {
            if (localData[i]['_localId']) {
                delete localData[i]['_localId'];
            }
        }
        return localData;
    }

    _log(data) {
        console.log('-------log--------');
        console.log(data);
        console.log('------------------');
    }

    // -------------------------------------
    // Data actions
    delete(object) {
        if (!object || !object['_localId']) {
            return;
        }
        let _deletedId = object['_localId'];
        let _index = this.findIndexOfLocalId(this.localData, _deletedId);
        if (_index >= 0) {
            this.localData.splice(_index, 1);
            if (object['_id']) {
                this.deletedList.push(object);
            }
        }
    }

    deleteItems(objectList: any[]) {
        for (let i = 0; i < objectList.length; i++) {
            this.delete(objectList[i]);
        }
    }
}
