import DataAccess = require('../DataAccess');
import IInventoryItemUnit = require("../../model/interfaces/IInventoryItemUnit");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class InventoryItemUnitSchema {
    static get schema() {
        var key = "inventoryItemUnitId";
        var transformName = 'inventoryItemUnit';
        var object = {
            inventoryItemUnitId: {
                type: String,
                unique: true,
            },
            inventoryItemUnitName: {
                type: String,
                require: true,
                unique: true,
            },
            inventoryItemUnitSymbol: {
                type: String
            },
            inventoryItemUnitDescription: {
                type: String
            },
            createBy: {
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

        let options = {
            key
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<IInventoryItemUnit>("inventory_item_units", InventoryItemUnitSchema.schema);
export = schema;
