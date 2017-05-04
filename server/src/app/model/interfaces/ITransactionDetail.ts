import mongoose = require("mongoose")

interface ITransactionDetail extends mongoose.Document {
    transactionDetailId: string;
    transaction: any;
    inventoryItem: any;
    stock: any;
    sencondStock: any;
    unit: string;
    quantity: number;
    price: number;
    baseUnit: string;
    conversionRate: number;
    conversionOperator: string;
    realQuantity: number;
    createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = ITransactionDetail;
