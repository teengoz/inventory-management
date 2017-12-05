import TransactionDetail = require("../model/TransactionDetail");
import ITransactionDetail = require("../model/interfaces/ITransactionDetail");
import TransactionDetailSchema = require("../dataAccess/schemas/TransactionDetailSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class TransactionDetailRepository extends RepositoryBase<ITransactionDetail> {
    constructor() {
        super(TransactionDetailSchema);
    }

    /**
     * removeByTransactionId: remove TransactionDetail by TransactionId
     */
    removeByTransactionId(_id: string, callback: (error: any) => void) {
        mongoose.set('debug', true);

        this._model.remove({ "transaction": new mongoose.Types.ObjectId(_id) }, callback)
    }

    /**
     * Remove all transactionDetails of a transaction, except transaction detail in updatedTransactionDetailIds
     */
    removeUnupdatedTransactionDetail(transactionId, updatedTransactionDetailIds, callback: (error: any) => void) {
        mongoose.set('debug', true);
        let condition = {
            $and: [
                { "transaction": new mongoose.Types.ObjectId(transactionId) },
                {
                    "_id": {
                        $nin: updatedTransactionDetailIds
                    }
                }
            ]
        }
        this._model.remove(condition, callback)
    }

    getQuantity(_id: string, callback: (error: any, result: any) => void) {
        mongoose.set('debug', true);

        let _aggLookup = [
            {
                "$lookup": {
                    "from": "inventory_items",
                    "localField": "inventoryItem",
                    "foreignField": "_id",
                    "as": "inventoryItem"
                },
            },
            {
                "$lookup": {
                    "from": "transactions",
                    "localField": "transaction",
                    "foreignField": "_id",
                    "as": "transaction"
                }
            },
        ];

        let _aggMatch = [{
            "$match": {
                $and: [
                    { "inventoryItem.inventoryItemId": _id },
                    { "transaction.isRecorded": true }
                ]
            }
        }];

        let _aggProject = [
            {
                "$project": {
                    "total": 1,
                    "totalImport": {
                        $cond: [
                            { "$eq": ["$transactionType", 1] }, "$realQuantity", 0
                        ]
                    },
                    "totalExport": {
                        $cond: [
                            { "$eq": ["$transactionType", 2] }, "$realQuantity", 0
                        ]
                    },
                    "inventoryItem.inventoryItemId": 1,
                    "inventoryItem.inventoryItemName": 1,
                    "transactionType": 1,
                    "baseUnit": 1,
                    "realQuantity": 1,
                    "transaction.isRecorded": 1
                }
            }];

        let _aggGroup = [
            {
                "$group": {
                    _id: { "id": "$inventoryItem.inventoryItemId", "name": "$inventoryItem.inventoryItemName", "unit": "$baseUnit" },
                    "total": {
                        "$sum": {
                            "$subtract": [
                                "$totalImport",
                                "$totalExport"
                            ]
                        }
                    }
                }
            }
        ]

        this._model
            .aggregate([
                ..._aggLookup,
                ..._aggMatch,
                ..._aggProject,
                ..._aggGroup
            ])
            .exec(callback);
    }
}

Object.seal(TransactionDetailRepository);
export = TransactionDetailRepository;
