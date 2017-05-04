import DataAccess = require('../DataAccess');
import ILemon = require("./../../model/interfaces/ILemon");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class LemonSchema {
    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            level: {
                type: Number,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            source: {
                type: String,
                required: false
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<ILemon>("Lemons", LemonSchema.schema);
export = schema;