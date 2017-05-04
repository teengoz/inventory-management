import DataAccess = require('../DataAccess');
import IStakeholderType = require("./../../model/interfaces/IStakeholderType");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class StakeholderTypeSchema {
    static get schema() {
        var key = 'stakeholderTypeId';

        var object = {
            stakeholderTypeId: {
                type: String,
                unique: true
            },
            stakeholderTypeCode: {
                type: String,
                unique: true,
                uppercase: true,
                trim: true
            },
            stakeholderTypeName: {
                type: String,
                require: true
            },
            stakeholderTypeDescription: {
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

        let options = {
            key
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<IStakeholderType>("stakeholder_types", StakeholderTypeSchema.schema);
export = schema;
