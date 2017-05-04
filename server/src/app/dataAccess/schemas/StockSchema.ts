import DataAccess = require('../DataAccess');
import IStock = require("../../model/interfaces/IStock");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class StockSchema {
    static get schema() {
        var key = "stockId";
        var object = {
            stockId: {
                type: String,
                unique: true
            },
            stockName: {
                type: String
            },
            stockCode: {
                type: String,
                unique: true,
                uppercase: true,
                trim: true
            },
            stockDescription: {
                type: String
            },
            stockAddress: {
                type: String
            },
            isActive: {
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
            },
        };

        let options = {
            key
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<IStock>("Stocks", StockSchema.schema);

export = schema;
