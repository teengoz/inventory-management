import DataAccess = require('../DataAccess');
import IInventoryItem = require("./../../model/interfaces/IInventoryItem");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class InventoryItemSchema {
    static get schema() {
        var key = "inventoryItemId";
        var object = {
            inventoryItemId: {
                type: String,
                unique: true
            },
            inventoryItemCategory: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'inventory_item_categories'
            },
            inventoryItemName: {
                type: String,
                require: function() {
                    return (!!this.inventoryItemName && this.inventoryItemName != '');
                },
                trim: true
            },
            inventoryItemCode: {
                type: String,
                require: function() {
                    return (!!this.inventoryItemCode && this.inventoryItemCode != '');
                },
                unique: true,
                trim: true
            },
            inventoryItemDescription: {
                type: String
            },
            inventoryItemMinQuantity: {
                type: Number
            },
            inventoryItemMaxQuantity: {
                type: Number
            },
            inventoryItemCostPrice: {
                type: Number
            },
            inventoryItemBaseUnit: {
                type: String,
                require: function() {
                    return (!!this.inventoryItemBaseUnit && this.inventoryItemBaseUnit != '');
                },
                trim: true
            },
            inventoryItemConversionUnit: {
                type: String
            },
            inventoryItemSpecification1: {
                type: String
            },
            inventoryItemSpecification2: {
                type: String
            },
            inventoryItemSpecification3: {
                type: String
            },
            inventoryItemSpecification4: {
                type: String
            },
            inventoryItemSpecification5: {
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
            }
        };

        let options = {
            'key': key,
            'refs': [
                {
                    'model': 'inventory_item_categories',
                    'key': {
                        'localField': 'inventoryItemCategory',
                        'foreignField': '_id'
                    },
                    'fields': [
                        'inventoryItemCategoryId',
                        'inventoryItemCategoryName'
                    ]
                }
            ]
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<IInventoryItem>("inventory_items", InventoryItemSchema.schema);
export = schema;
