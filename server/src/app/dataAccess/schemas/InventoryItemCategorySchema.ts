import DataAccess = require('../DataAccess');
import IInventoryItemCategory = require("./../../model/interfaces/IInventoryItemCategory");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class InventoryItemCategorySchema {
    static get schema() {
        var key = 'inventoryItemCategoryId';

        var object = {
            inventoryItemCategoryId: {
                type: String,
                unique: true
            },
            inventoryItemCategoryName: {
                type: String,
                require: true,
            },
            inventoryItemCategoryCode: {
                type: String,
                unique: true,
                uppercase: true,
                trim: true                
            },
            inventoryItemCategoryDescription: {
                type: String
            },
            parent: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'inventory_item_categories',
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
            'key': key,
            'refs': [
                {
                    'model' : 'inventory_item_categories',
                    'key' : {
                        'localField': 'parent',
                        'foreignField': '_id'
                    },
                    'fields' : [
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

var schema = mongooseConnection.model<IInventoryItemCategory>("inventory_item_categories", InventoryItemCategorySchema.schema);
export = schema;
