import DataAccess = require('../DataAccess');
import IUser = require("./../../model/interfaces/IUser");
import crypto = require('crypto');
import jwt = require('jsonwebtoken');
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {
    static get schema() {
        var key = "userId";
        var object = {
            username: {
                type: String,
                lowercase: true,
                unique: true,
                trim: true
            },
            password: {
                type: String
            },
            hash: {
                type: String
            },
            salt: {
                type: String
            },
            jobTitle: {
                type: String
            },
            fullName: {
                type: String
            },
            email: {
                type: String
            },
            phone: {
                type: String
            },
            address: {
                type: String
            },
            isActive: {
                type: String
            },
            createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            },
        };

        let hiddenFields = ['__v', 'createdBy', 'updatedBy'];
        
        let options = {
            key,
            hiddenFields
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<IUser>("users", UserSchema.schema);
export = schema;
