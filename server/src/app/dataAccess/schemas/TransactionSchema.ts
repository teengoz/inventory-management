import DataAccess = require('../DataAccess');
import ITransaction = require("./../../model/interfaces/ITransaction");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class TransactionSchema {
    static get schema() {
        var object = {
            transactionId: {
                type: String,
                unique: true
            },
            stakeholder: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'stakeholders'
            },
            transactionType: {
                type: String,
                enum: ['1', '2', '3']
            },
            transactionNo: {
                type: String,
                unique: true,
                uppercase: true,
                trim: true
            },
            transactionDescription: {
                type: String
            },
            transactionTime: {
                type: Date,
                require: true,
                default: Date.now
            },
            isRecorded: {
                type: Boolean
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
        var key = 'transactionId';
        let options = {
            'key': key,
            'refs': [
                {
                    'model': 'stakeholders',
                    'key': {
                        'localField': 'stakeholder',
                        'foreignField': '_id'
                    },
                    'fields': [
                        'stakeholderId',
                        'stakeholderName'
                    ]
                },
                {
                    'model': 'transaction_details',
                    'key': {
                        'localField': '_id',
                        'foreignField': 'transaction'
                    },
                    'fields': [
                        'price',
                        'quantity',
                        'stock',
                        'secondStock',
                        'unit',
                        'inventoryItem',
                        'lotNo'
                    ],
                    'as': 'transactionDetailData'
                }
            ]
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<ITransaction>("transactions", TransactionSchema.schema);
export = schema;
