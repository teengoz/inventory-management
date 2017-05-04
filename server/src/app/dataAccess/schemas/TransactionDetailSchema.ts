import DataAccess = require('../DataAccess');
import ITransactionDetail = require("./../../model/interfaces/ITransactionDetail");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class TransactionDetailSchema {
    static get schema() {
        var object = {
            transactionDetailId: {
                type: String,
                unique: true
            },
            transaction: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'transactions'
            },
            inventoryItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'inventory_items'
            },
            stock: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'stocks'
            },
            secondStock: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'stocks'
            },
            unit: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            baseUnit: {
                type: String,
                required: true
            },
            conversionRate: {
                type: Number
            },
            conversionOperator: {
                type: String
            },
            realQuantity: {
                type: Number,
                required: true
            },
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        };

        var key = 'transactionDetailId';
        let options = {
            'key': key,
            'refs': [
                {
                    'model': 'transactions',
                    'key': {
                        'localField': 'transaction',
                        'foreignField': '_id'
                    },
                    'fields': [
                        'transactionId',
                        'transactionNo'
                    ]
                },
                {
                    'model': 'inventory_items',
                    'key': {
                        'localField': 'inventoryItem',
                        'foreignField': '_id'
                    },
                    'fields': [
                        'inventoryItemId',
                        'inventoryItemName'
                    ]
                },
                {
                    'model': 'stocks',
                    'key': {
                        'localField': 'stock',
                        'foreignField': '_id'
                    },
                    'fields': [
                        'stockId',
                        'stockName'
                    ]
                },
                {
                    'model': 'stocks',
                    'key': {
                        'localField': 'secondStock',
                        'foreignField': '_id'
                    },
                    'fields': [
                        'stockId',
                        'stockName'
                    ]
                }
            ]
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<ITransactionDetail>("transaction_details", TransactionDetailSchema.schema);
export = schema;
