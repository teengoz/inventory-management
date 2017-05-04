import mongoose = require("mongoose")

interface IInventoryItemDiscount extends mongoose.Document {
    inventoryItemDiscountId: string;
    inventoryItem: any;
    inventoryItemDiscountMinQuantity: number;
    inventoryItemDiscountMaxQuantity: number;
    inventoryItemDiscountValue: number;
    inventoryItemDiscountType: number;
    isActive: boolean;
    createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = IInventoryItemDiscount;