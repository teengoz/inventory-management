import DataAccess = require('../DataAccess');
import IInventoryItemDiscount = require("./../../model/interfaces/IInventoryItemDiscount");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class InventoryItemDiscountSchema {
    static get schema() {
        var object = {
            inventoryItemDiscountId: {
                type: String,
                unique: true
            },
            inventoryItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'inventory_items'
            },
            inventoryItemDiscountMinQuantity: {
                type: Number
            },
            inventoryItemDiscountMaxQuantity: {
                type: Number
            },
            inventoryItemDiscountValue: {
                type: Number
            },
            inventoryItemDiscountType: {
                type: Number
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

        var key = "inventoryItemDiscountId";

        let options = {
            'key': key,
            'refs': [
                {
                    'model' : 'inventory_items',
                    'key' : {
                        'localField': 'inventoryItem',
                        'foreignField': '_id'
                    },
                    'fields' : [
                        'inventoryItemId',
                        'inventoryItemName'
                    ]
                }
            ]
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<IInventoryItemDiscount>("inventory_item_discounts", InventoryItemDiscountSchema.schema);
export = schema;