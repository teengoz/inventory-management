import mongoose = require("mongoose")

interface IInventoryItemCategory extends mongoose.Document {
    inventoryItemCategoryId: string;
    inventoryItemCategoryName: string;
    inventoryItemCategoryCode: string;
    inventoryItemCategoryDescription: string;
    parent: any;
    isActive: boolean;
 	createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = IInventoryItemCategory;
