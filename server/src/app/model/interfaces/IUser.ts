import mongoose = require("mongoose");

interface IUser extends mongoose.Document {
    userId: string;
    username: string;
    password: string;
    hash: string;
    salt: string;
    jobTitle: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    isActive: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export = IUser;
