import TransactionDetailRepository = require("../repository/TransactionDetailRepository");
import ITransactionDetailBusiness = require("./interfaces/ITransactionDetailBusiness");
import ITransactionDetail = require("../model/interfaces/ITransactionDetail");
import TransactionDetail = require("../model/TransactionDetail");
import mongoose = require("mongoose");


class TransactionDetailBusiness implements ITransactionDetailBusiness {
    private _transactionDetailRepository: TransactionDetailRepository;

    constructor() {
        this._transactionDetailRepository = new TransactionDetailRepository();
    }

    create(req, callback: (error: any, result: any) => void) {
        let body = req.body;
        let item;
        // if (!item['inventoryItemName'] || !item['inventoryItemCostPrice'] || !item['inventoryItemBaseUnit']) {
        //     callback('error', null);
        //     return;
        // }
        //
        // let userId = req['payload']['_id'];
        // item['createdBy'] = userId;
        //
        // let inventoryItemCategoryId = body['basic']['inventoryItemCategory.inventoryItemCategoryId'];
        // item['inventoryItemCategory'] = inventoryItemCategoryId;
        //
        // let inventoryItemConversionUnit = body['unitConversion'];
        // item['inventoryItemConversionUnit'] = JSON.stringify(inventoryItemConversionUnit);
        //
        // let specification = body['specification'];
        // for (let i = 0; i < 5; i++) {
        //     let spec = specification[i];
        //     if (spec) {
        //         item['inventoryItemSpecification' + (i + 1)] = spec;
        //     }
        // }
        //
        // if (!body['inventoryItemCode']) {
        //     let newId = new Date().getTime().toString();
        //     item['inventoryItemCode'] = newId;
        // }

        this._transactionDetailRepository.create(item, callback);
    }

    insert(detail, callback: (error: any, result: any) => void) {
        this._transactionDetailRepository.create(detail, callback);
    }

    validDetail(object): boolean {

        return false;
    }

    update(_id, item, callback: (error: any, result: any) => void) {
        this._transactionDetailRepository.update(_id, item, callback);
    };

    updateItem(req, callback: (error: any, result: any) => void) {
        var _id: string = req.params._id;

        this._transactionDetailRepository.findById(_id, (error, result) => {
            if (error)
                callback(error, result);
            else {
                let body = req.body;
                let currentItem = result;
                let item = <ITransactionDetail>body['basic'];

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

                this._transactionDetailRepository.update(currentItem._id, item, callback);
            }

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._transactionDetailRepository.delete(_id, callback);
    }

    deteleByTransactionId(_transactionId, callback: (error: any) => void) {
        this._transactionDetailRepository.removeByTransactionId(_transactionId, callback);
    }

    deleteUnupdatedTransactionDetail(transactionId, updatedTransactionDetailIds, callback: (error: any) => void) {
        this._transactionDetailRepository.removeUnupdatedTransactionDetail(
            transactionId,
            updatedTransactionDetailIds,
            callback
        )
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionDetailRepository.retrieve(callback, _options);
    }

    findByTransactionId(_transactionId, callback: (error: any, result: any) => void) {
        let _options = {};
        _options['cond'] = {};
        _options['cond']['filter'] = { 'transaction._id': new mongoose.Types.ObjectId(_transactionId) };
        _options['cond']['type'] = '=';

        this._transactionDetailRepository.find(callback, _options);
    }

    findByInventoryItemId(_inventoryItemId: string, callback: (error: any, result: any) => void) {
        let _options = {};
        _options['cond'] = {};
        _options['cond']['filter'] = { 
            $and: [
                { 'inventoryItem.inventoryItemId': _inventoryItemId },
                { "transaction.isRecorded": true }
            ]
        };
        _options['cond']['type'] = '=';
        _options['fields'] = [
            'transactionType', 'realQuantity'
        ]

        this._transactionDetailRepository.find(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionDetailRepository.find(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: ITransactionDetail) => void) {
        this._transactionDetailRepository.findById(_id, callback);
    }

    findCode(_code: string, callback: (error: any, result: any) => void) {
        let _options = {};
        _options['cond'] = {};
        _options['cond']['filter'] = { 'inventoryItemCode': _code };
        _options['cond']['type'] = '=';

        this._transactionDetailRepository.find(callback, _options);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._transactionDetailRepository.meta(callback, _options);
    }
}


Object.seal(TransactionDetailBusiness);
export = TransactionDetailBusiness;
