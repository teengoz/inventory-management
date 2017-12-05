import mongoose = require("mongoose")

interface ITransactionDetail extends mongoose.Document {
    transactionDetailId: string;
    transaction: any;
    transactionType: number;
    inventoryItem: any;
    stock: any;
    secondStock: any;
    unit: string;
    quantity: number;
    price: number;
    baseUnit: string;
    conversionRate: number;
    conversionOperator: string;
    realQuantity: number;
    lotNo: string;
    createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = ITransactionDetail;
