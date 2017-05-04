import mongoose = require("mongoose")

interface IStakeholder extends mongoose.Document {
    stakeholderId: string;
    stakeholderType: any;
    stakeholderCode: string;
    stakeholderName: string;
    stakeholderDescription: string;
    stakeholderAddress: string;
    stakeholderPhone1: string;
    stakeholderPhone2: string;
    stakeholderFax: string;
    stakeholderEmail: string;
    stakeholderTaxcode: string;
    stakeholderAccountNumber: string;
    stakeholderBank: string;
    isActive: boolean;
    createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = IStakeholder;
