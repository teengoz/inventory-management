import TransactionRepository = require("../repository/TransactionRepository");
import ITransactionBusiness = require("./interfaces/ITransactionBusiness");
import InventoryItemBusiness = require('../business/InventoryItemBusiness');
import StockBusiness = require('../business/StockBusiness');
import TransactionDetailBusiness = require('../business/TransactionDetailBusiness');
import ITransaction = require("../model/interfaces/ITransaction");
import ITransactionDetail = require("../model/interfaces/ITransactionDetail");
import Transaction = require("../model/Transaction");


class TransactionBusiness implements ITransactionBusiness {
    private _transactionRepository: TransactionRepository;

    constructor() {
        this._transactionRepository = new TransactionRepository();
    }

    create(req, callback: (error: any, result: any) => void) {
        let body = req.body;
        let basic = req.body['basic'];
        let plainDetailData = req.body['detail'];
        let item = {};
        let transactionDetails: ITransactionDetail[];

        let userId = req['payload']['_id'];
        item['createdBy'] = userId;

        item['stakeholder'] = basic['stakeholder'];
        item['transactionType'] = basic['transactionType'];
        let newId = new Date().getTime().toString();
        item['transactionNo'] = newId;
        item['transactionDescription'] = basic['description'];
        item['transactionTime'] = new Date(+basic['time'] * 1000);
        item['isRecorded'] = basic['isRecorded'] || false;

        let detailRows = []

        this.validDetailData(this, plainDetailData, detailRows, this.validDetailData, () => {
            console.log('Error validDetailData');
            console.log('error');
        }, (data) => {
            // console.log('BASIC');
            // console.log(item);
            // console.log('insertTransaction');
            // console.log(data);
            this.insertTransaction(item, data, callback);
        })
        //callback('error heheh', null);
        //this._transactionRepository.create(item, callback);
    }

    insertTransaction(item, data, callback) {
        this._transactionRepository.create(item, (error, result) => {
            let createdBy = result['createdBy'];
            let transactionId = result['transactionId'];
            let commonData = {
                createdBy, transactionId
            }
            this.insertTransactionDetail(commonData, data, callback);
        });
    }

    insertTransactionDetail(commonData, data, callback) {
        let transactionDetailBusiness = new TransactionDetailBusiness();
        let base = this;

        if (data.length > 0) {
            let _detail = data.pop();
            _detail['createdBy'] = commonData['createdBy'];
            _detail['transaction'] = commonData['transactionId'];
            transactionDetailBusiness.insertDetail(_detail, (error, result) => {
                base.insertTransactionDetail(commonData, data, callback);
            });
        } else {
            callback(null, 'DONE');
        }
    }

    validDetailData(base, data: any[], validData: any[], loopCallback, failCallback, nextCallback) {
        if (data.length > 0) {
            let currentDetail = data.pop();
            let inventoryItemBusiness = new InventoryItemBusiness();
            inventoryItemBusiness.findById(currentDetail['item'], (error, result) => {
                if (error) {
                    failCallback();
                } else {
                    let stockBusiness = new StockBusiness();
                    let currentInventoryItem = result;
                    stockBusiness.findById(currentDetail['stock'], (error, result) => {
                        if (error) {
                            failCallback();
                        } else {
                            let currentStock = result;
                            let inventoryItemId = currentInventoryItem.inventoryItemId;
                            let inventoryItemBaseUnit = currentInventoryItem.inventoryItemBaseUnit;
                            let inventoryItemConversionUnit = JSON.parse(currentInventoryItem.inventoryItemConversionUnit);
                            let _detail = {};
                            _detail['inventoryItem'] = inventoryItemId;
                            _detail['stock'] = currentStock.stockId;
                            let indexOfUnit = base.isValidUnit(currentDetail['unit'], inventoryItemConversionUnit);
                            let rate = 1;
                            if ((<string>currentDetail['unit']).toLowerCase() != inventoryItemBaseUnit.toLowerCase()
                            ) {
                                if (indexOfUnit == -1) {
                                    failCallback();
                                } else {
                                    rate = inventoryItemConversionUnit[indexOfUnit]['inventoryItemUnitConversionRate'];
                                }
                            }
                            _detail['unit'] = currentDetail['unit'];
                            _detail['quantity'] = +currentDetail['quantity'] || 0;
                            _detail['price'] = +currentDetail['price'] || 0;
                            _detail['baseUnit'] = inventoryItemBaseUnit;
                            _detail['conversionRate'] = rate;
                            _detail['realQuantity'] = rate * _detail['quantity'];
                            validData.push(_detail);
                            loopCallback(base, data, validData, loopCallback, failCallback, nextCallback);
                        }
                    });
                }
            });
        } else {
            if (nextCallback)
                nextCallback(validData);
        }
    }

    private isValidUnit(unit: string, unitList: any[]): number {
        if (unitList && unitList.length > 0) {
            for (let i = 0; i < unitList.length; i++) {
                if (unit.toLowerCase() == (<string>unitList[i]['inventoryItemUnitConversionName']).toLowerCase()) {
                    return i;
                }
            }
        }
        return -1;
    }

    update(_id: string, item, callback: (error: any, result: any) => void) {

    };

    updateItem(req, callback: (error: any, result: any) => void) {
        var _id: string = req.params._id;

        this._transactionRepository.findById(_id, (error, result) => {
            if (error)
                callback(error, result);
            else {
                let body = req.body;
                let currentItem = result;
                let item = <ITransaction>body['basic'];

                if (!item['inventoryItemCode']) {
                    delete item['inventoryItemCode'];
                }
                item['inventoryItemCode'] = currentItem['inventoryItemCode'];

                if (!item['inventoryItemName'] || !item['inventoryItemCostPrice'] || !item['inventoryItemBaseUnit']) {
                    callback('error', null);
                    return;
                }

                let userId = req['payload']['_id'];
                item['createdBy'] = userId;

                let inventoryItemCategoryId = body['basic']['inventoryItemCategory.inventoryItemCategoryId'];
                item['inventoryItemCategory'] = inventoryItemCategoryId;
                delete item['inventoryItemCategory.inventoryItemCategoryId'];

                let inventoryItemConversionUnit = body['unitConversion'];
                item['inventoryItemConversionUnit'] = JSON.stringify(inventoryItemConversionUnit);

                let specification = body['specification'];
                for (let i = 0; i < 5; i++) {
                    let spec = specification[i];
                    if (spec) {
                        item['inventoryItemSpecification' + (i + 1)] = spec;
                    } else {
                        item['inventoryItemSpecification' + (i + 1)] = null;
                    }
                }

                this._transactionRepository.update(currentItem._id, item, callback);
            }

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._transactionRepository.delete(_id, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionRepository.find(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: ITransaction) => void) {
        this._transactionRepository.findById(_id, callback);
    }

    // search(_keyword: string, callback: (error: any, result: any) => void) {
    //     if (!!_keyword) {
    //         let _options = {};
    //         _options['cond'] = {};
    //         _options['cond']['filter'] = {
    //             $or: [
    //                 { 'inventoryItemCode': new RegExp(_keyword, 'i') },
    //                 { 'inventoryItemName': new RegExp(_keyword, 'i') }
    //             ]
    //         };
    //         _options['cond']['type'] = 'search';
    //
    //         this._transactionRepository.find(callback, _options);
    //     } else {
    //         this._transactionRepository.retrieve(callback, {});
    //     }
    // }

    findCode(_code: string, callback: (error: any, result: any) => void) {
        let _options = {};
        _options['cond'] = {};
        _options['cond']['filter'] = { 'inventoryItemCode': _code };
        _options['cond']['type'] = '=';

        this._transactionRepository.find(callback, _options);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionRepository.meta(callback, _options);
    }
}


Object.seal(TransactionBusiness);
export = TransactionBusiness;
