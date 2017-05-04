import mongoose = require("mongoose");

interface IInventoryItemUnit extends mongoose.Document {
    inventoryItemUnitId: string;
    inventoryItemUnitName: string;
    inventoryItemUnitSymbol: string;
    inventoryItemUnitDescription: string;
    createBy: any;
    updatedBy: any;
    createdBy: Date;
    updatedAt: Date;
}

export = IInventoryItemUnit;
