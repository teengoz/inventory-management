import DataAccess = require('../DataAccess');
import IStakeholder = require("./../../model/interfaces/IStakeholder");
import IStakeholderType = require('../../model/interfaces/IStakeholderType');
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class StakeholderSchema {
    static get schema() {
        var key = 'stakeholderId';

        var object = {
            stakeholderId: {
                type: String,
                unique: true
            },
            stakeholderType: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'stakeholder_types',
                require: true
            },
            stakeholderCode: {
                type: String,
                unique: true,
                require: true
            },
            stakeholderName: {
                type: String,
                require: true
            },
            stakeholderDescription: {
                type: String
            },
            stakeholderAddress: {
                type: String
            },
            stakeholderGender: {
                type: String
            },
            stakeholderPhone1: {
                type: String
            },
            stakeholderPhone2: {
                type: String
            },
            stakeholderFax: {
                type: String
            },
            stakeholderEmail: {
                type: String
            },
            stakeholderTaxcode: {
                type: String
            },
            stakeholderAccountNumber: {
                type: String
            },
            stakeholderBank: {
                type: String
            },
            isActive: {
                type: Boolean
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

        let options = {
            'key': key,
            'refs': [
                {
                    'model': 'stakeholder_types',
                    'key': {
                        'localField': 'stakeholderType',
                        'foreignField': '_id'
                    },
                    'fields': [
                        'stakeholderTypeId',
                        'stakeholderTypeName'
                    ]
                }
            ]
        }

        var schema = new Schema(object, options).schema;

        schema.pre('find', function(next) {
            this.populate('stakeholderType', 'stakeholderTypeName');
            next();
        });

        return schema;
    }
}

var schema = mongooseConnection.model<IStakeholder>("stakeholders", StakeholderSchema.schema);

export = schema;
