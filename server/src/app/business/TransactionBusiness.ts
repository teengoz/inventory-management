import TransactionRepository = require("../repository/TransactionRepository");
import ITransactionBusiness = require("./interfaces/ITransactionBusiness");
import InventoryItemBusiness = require('../business/InventoryItemBusiness');
import StockBusiness = require('../business/StockBusiness');
import TransactionDetailBusiness = require('../business/TransactionDetailBusiness');
import ITransaction = require("../model/interfaces/ITransaction");
import ITransactionDetail = require("../model/interfaces/ITransactionDetail");
import Transaction = require("../model/Transaction");

const TRANSFER_TRANSACTION = 3;
const INWARD_TRANSACTION = 1;
const OUTWARD_TRANSACTION = 2;
enum TRANSACTION_TYPE {
    TRANSFER_TRANSACTION, INWARD_TRANSACTION, OUTWARD_TRANSACTION
}

class TransactionBusiness implements ITransactionBusiness {
    private _transactionRepository: TransactionRepository;
    private _transactionDetailRepository: TransactionDetailBusiness;
    private _transactionType: TRANSACTION_TYPE;

    constructor() {
        this._transactionRepository = new TransactionRepository();
        this._transactionDetailRepository = new TransactionDetailBusiness();
    }

    create(req, callback: (error: any, result: any) => void) {
        // Basic data
        let body = req.body;
        let basic = req.body['basic'];

        // Detail data
        let plainDetailData = req.body['detail'];
        let item = {};
        let transactionDetails: ITransactionDetail[];

        // User Id for createdBy
        let userId = req['payload']['_id'];
        item['createdBy'] = userId;

        // Generate auto id
        let newId = new Date().getTime().toString();

        // Assign basic data
        this._transactionType = item['transactionType'] = basic['transactionType'];
        item['transactionNo'] = newId;
        item['transactionDescription'] = basic['description'];
        let time = (+basic['time'] == 0) ? new Date() : new Date(+basic['time'] * 1000);
        item['transactionTime'] = time;
        item['isRecorded'] = basic['isRecorded'] || false;
        if (basic['transactionType'] != TRANSFER_TRANSACTION) {
            item['stakeholder'] = basic['stakeholder'];
        }

        // Initialize detail rows
        let detailRows = []

        //Valid plain data
        this.validDetailData(this, plainDetailData, detailRows, this.validDetailData, () => {
            console.log('Error validDetailData');
            console.log('error');
        }, (validData) => {
            // console.log('BASIC');
            // console.log(item);
            // console.log('insertTransaction');
            // console.log(data);
            this.insertTransaction(item, validData, callback);
        })
        //callback('error', null);
        //this._transactionRepository.create(item, callback);
    }

    insertTransaction(item, data, callback) {
        this._transactionRepository.create(item, (error, result) => {
            let createdBy = result['createdBy'];
            let transactionId = result['transactionId'];
            let transactionType = result['transactionType']

            // Values in exist in all of item in transactionDetailData
            let commonData = {
                createdBy, transactionId, transactionType
            }
            this.insertTransactionDetail(commonData, data, callback);
        });
    }

    /**
     * commonData = Values in exist in all of item in transactionDetailData
     * data = Array of transactionDetail
     */
    insertTransactionDetail(commonData, data, callback) {
        let transactionDetailBusiness = new TransactionDetailBusiness();
        let base = this;

        if (data.length > 0) {
            let _detail = data.pop();
            _detail['createdBy'] = commonData['user'];
            _detail['transaction'] = commonData['transactionId'];
            _detail['transactionType'] = commonData['transactionType'];
            transactionDetailBusiness.insert(_detail, (error, result) => {
                base.insertTransactionDetail(commonData, data, callback);
            });
        } else {
            callback(null, 'DONE');
        }
    }

    updateByRequestData(req, callback: (error: any, result: any) => void) {
        // Basic data
        let body = req.body;
        let basic = req.body['basic'];
        let _id: string = req.params._id;

        // Detail data
        let plainDetailData = req.body['detail'];
        let item = {};
        let transactionDetails: ITransactionDetail[];

        // Transaction Id
        item['transactionId'] = _id;

        // User Id for updatedBy
        let userId = req['payload']['_id'];
        item['updatedBy'] = userId;
        this._transactionType = basic['transactionType'];
        item['transactionDescription'] = basic['description'];
        let time = (+basic['time'] == 0) ? new Date().getTime() : +basic['time'];
        item['transactionTime'] = new Date(time * 1000);
        item['isRecorded'] = basic['isRecorded'] || false;
        if (basic['transactionType'] != TRANSFER_TRANSACTION) {
            item['stakeholder'] = basic['stakeholder'];
        }

        // Initialize detail rows
        let detailRows = []

        //Valid plain data
        this.validDetailData(this, plainDetailData, detailRows, this.validDetailData, () => {
            console.log('Error validDetailData');
            console.log('error');
        }, (validData) => {
            // Use method for save detail data
            this.updateTransaction(item, validData, callback);
        })
    }

    updateTransaction(item, validData, callback) {
        console.log('--------------updateTransaction--------------')
        this._transactionRepository.update(item['transactionId'], item, (error, result) => {
            if (error) {
                callback(error, null);
                return;
            }
            let user = item['updatedBy'];
            let transactionId = item['transactionId'];
            let transactionType = result['transactionType']
            let updateTransactionDetailIds = [];

            // Values in exist in all of items in transactionDetailData
            let commonData = {
                user, transactionId, transactionType, updateTransactionDetailIds
            }

            this.saveTransactionDetail(commonData, validData, callback);
        })
    }

    saveTransactionDetail(commonData, data, callback) {
        let transactionDetailBusiness = new TransactionDetailBusiness();
        let base = this;

        if (data.length > 0) {
            let _detail = data.pop();
            if (_detail['transactionDetailId']) {
                _detail['updatedBy'] = commonData['user'];
                _detail['transaction'] = commonData['transactionId'];
                _detail['transactionType'] = commonData['transactionType'];
                transactionDetailBusiness.update(_detail['transactionDetailId'], _detail, (error, result) => {
                    commonData['updateTransactionDetailIds'].push(_detail['transactionDetailId']);
                    base.saveTransactionDetail(commonData, data, callback);
                });
            } else {
                _detail['createdBy'] = commonData['user'];
                _detail['transaction'] = commonData['transactionId'];
                transactionDetailBusiness.insert(_detail, (error, result) => {
                    base.saveTransactionDetail(commonData, data, callback);
                });
            }
        } else {
            if (commonData['updateTransactionDetailIds']) {
                console.log('--------------deleteUnupdatedTransactionDetail--------------')
                console.log(commonData['updateTransactionDetailIds']);
                transactionDetailBusiness.deleteUnupdatedTransactionDetail(
                    commonData['transactionId'],
                    commonData['updateTransactionDetailIds'],
                    (error) => {
                        callback(error, 'DONE');
                    }
                )
            } else {
                callback(null, 'DONE');
            }
        }
    }

    record(_id, _record, callback: (error: any, result: any) => void) {
        this._transactionRepository.findById(_id, (err, res) => {
            if (err) {
                callback(err, res);
            }
            else {
                let placeholderTransaction: any = {};
                placeholderTransaction.isRecorded = _record;
                //console.log(res);
                this._transactionRepository.update(res._id, placeholderTransaction, callback);
                //callback(null, "DONE");
            }
        });
    }

    update(_id: string, item, callback: (error: any, result: any) => void) {

    };

    delete(_id: string, callback: (error: any) => void) {
        this._transactionRepository.delete(_id, (error, result) => {
            let transactionDetailBusiness = new TransactionDetailBusiness();
            transactionDetailBusiness.deteleByTransactionId(_id, callback);
        });
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};
        _options['cond'] = {};
        _options['cond']['sort'] = {
            'transactionTime': -1
        };

        console.log('RETRIVE--------')
        console.log(_options);

        this._transactionRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionRepository.find(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: ITransaction) => void) {
        this._transactionRepository.findById(_id, (error, result) => {
            let transaction = result;
            let transactionId = result.transactionId;
            let transactionDetailBusiness = new TransactionDetailBusiness();
            transactionDetailBusiness.findByTransactionId(transactionId, (error, result) => {
                transaction['transactionDetailData'] = result;
                callback(null, transaction);
            })
        });
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionRepository.meta(callback, _options);
    }

    /**
     * base = this
     * data = plain data
     * validData = the data is valid
     * loopCallback = execute validation the next position in plainDetailData
     * failCallback = execute when there is a item which is invalid
     * nextCallback = execute when all of item in plainData are valid
     */
    validDetailData(base, data: any[], validData: any[], loopCallback, failCallback, nextCallback) {
        if (data.length > 0) {
            let currentDetail = data.pop();
            if (!base.isValidStock(currentDetail)) {
                failCallback();
                return;
            }
            let inventoryItemBusiness = new InventoryItemBusiness();
            inventoryItemBusiness.findById(currentDetail['item'], (error, result) => {
                if (error) {
                    failCallback();
                } else {
                    let currentInventoryItem = result;

                    // Check stock data for valid information
                    let stockBusiness = new StockBusiness();
                    let stocks = [];
                    if (currentDetail['stock']) {
                        stocks.push(currentDetail['stock']);
                    }

                    if (currentDetail['secondStock']) {
                        stocks.push(currentDetail['secondStock']);
                    }

                    /**
                     * check existence of stocks
                     * assign value for transactionDetail
                     * add transactionDetail to validData
                     * execute loopCallback
                     */
                    stockBusiness.getByIds(stocks, (error, result) => {
                        if (error || result.length < 0) {
                            failCallback();
                        } else {
                            let inventoryItemId = currentInventoryItem.inventoryItemId;
                            let inventoryItemBaseUnit = currentInventoryItem.inventoryItemBaseUnit;
                            let inventoryItemConversionUnit = JSON.parse(currentInventoryItem.inventoryItemConversionUnit);

                            let _detail = {};
                            if (currentDetail['id']) {
                                _detail['transactionDetailId'] = currentDetail['id'];
                            }
                            _detail['inventoryItem'] = inventoryItemId;
                            _detail['stock'] = currentDetail['stock'];
                            if (currentDetail['secondStock']) {
                                _detail['secondStock'] = currentDetail['secondStock'];
                            }
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
                            _detail['lotNo'] = currentDetail['lotNo'];
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

    private isValidStock(detail) {
        if (!detail['stock']) {
            return false;
        } else if (this._transactionType == TRANSFER_TRANSACTION && !detail['secondStock']) {
            return false;
        } else if (detail['secondStock'] && detail['secondStock'] == detail['stock']) {
            return false;
        }
        return true;
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
}


Object.seal(TransactionBusiness);
export = TransactionBusiness;
