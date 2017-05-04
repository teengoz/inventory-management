import DataAccess = require('../DataAccess');
import ISystemConfig = require("./../../model/interfaces/ISystemConfig");
import { BaseSchema as Schema } from '../BaseSchema';

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class SystemConfigSchema {
    static get schema() {
        var key = 'systemConfigId';
        var object = {
            systemConfigId: {
                type: String,
                unique: true
            },
            systemConfigName: {
                type: String,
                require: true
            },
            systemConfigFieldName: {
                type: String,
                unique: true,
                trim: true
            },
            systemConfigDescription: {
                type: String
            },
            systemConfigInputType: {
                type: String,
                require: true
            },
            systemConfigValue: {
                type: String
            },
            systemConfigOptionValues: {
                type: String
            },
            systemConfigControlType: {
                type: String
            },
            systemConfigLabelWidth: {
                type: Number
            },
            systemConfigInputWidth: {
                type: Number
            },
            systemConfigRequired: {
                type: Boolean
            },
            systemConfigInline: {
                type: Boolean
            },
            systemConfigOrder: {
                type: Number
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
            }
        };

        let options = {
            key
        }

        var schema = new Schema(object, options).schema;
        return schema;
    }
}

var schema = mongooseConnection.model<ISystemConfig>("system_config", SystemConfigSchema.schema);
export = schema;
