import mongoose = require("mongoose")

interface IStakeholderType extends mongoose.Document {
    stakeholderTypeId: string;
    stakeholderTypeCode: string;
    stakeholderTypeName: string;
    stakeholderTypeDescription: string;
    createdBy: any;
    updatedBy: any;
    createdAt: Date;
    updatedAt: Date;
}

export = IStakeholderType;