import mongoose = require("mongoose")

interface ITransaction extends mongoose.Document {
    transactionId: string;
    stakeholder: any;
    transactionType: string;
    transactionNo: string;
    transactionDescription: string;
    transactionTime: Date;
    isRecorded: boolean;
    createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = ITransaction;
