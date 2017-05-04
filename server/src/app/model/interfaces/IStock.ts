import mongoose = require("mongoose")

interface IStock extends mongoose.Document {
    stockId: string;
    stockName: string;
    stockCode: string;
    stockDescription: string;
    stockAddress: string;
    isActive: boolean;
    createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = IStock;
