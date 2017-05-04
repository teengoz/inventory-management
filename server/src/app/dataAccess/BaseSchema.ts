import DataAccess = require('./DataAccess');
import { transformFields as tffs } from '../../config/constants/transform-fields';

var mongoose = DataAccess.mongooseInstance;

class BaseSchema {
    private _schema: any;
    private transformFields = tffs.stock;
    private key = '';
    private hiddenFields = ['id', '_id', '__v', 'createdBy', 'updatedBy'];
    private refs = [
        {
            'model' : 'users',
            'key' : {
                'localField': 'createdBy',
                'foreignField': '_id'
            },
            'fields' : [
                'userId', 'username'
            ]
        }
    ];

    constructor(object, options = {}) {
        var baseThis = this;
        this._schema = mongoose.Schema(object);

        if (options['key']) {
            this.key = options['key'];
        }

        if (options['hiddenFields']) {
            this.hiddenFields = options['hiddenFields'];
        }

        if (options['refs']) {
            this.refs = [ ...this.refs, ...options['refs'] ];
        }

        this._schema.options['hiddenFields'] = this.hiddenFields;
        this._schema.options['refs'] = this.refs;


        this._schema.options['toObject'] = {
            virtuals: true,
            transform: (doc, ret) => {
                this.hiddenFields.forEach((elm, idx) => {
                    if (ret.hasOwnProperty(elm) && elm != 'createdBy' && elm != 'updatedBy') {
                        delete ret[elm];
                    }
                });
            }
        };

        this._schema.options['toJSON'] = {
            transform: (doc, ret) => {
                this.hiddenFields.forEach((elm, idx) => {
                    if (ret.hasOwnProperty(elm) && elm != 'createdBy' && elm != 'updatedBy') {
                        delete ret[elm];
                    }
                });

                // this.transformFields.forEach((elm, idx) => {
                //     let originalName = Object.keys(elm)[0];
                //     let transformName = elm[originalName];

                //     if (ret.hasOwnProperty(originalName)) {
                //         ret[transformName] = ret[originalName];
                //         delete ret[originalName];
                //     }
                // });

                // Object.keys(ret).forEach((key, idx) => {
                //     let originalName = key;
                //     let transformName = tffs.toSnakeCase(key);

                //     if (originalName != transformName) {
                //         ret[transformName] = ret[originalName];
                //         delete ret[originalName];
                //     }
                // })
            },
            virtuals: true
        };

        this._schema.pre('save', function(next) {
            //"this" in context is the object which sent to server by request with "_id"
            //"baseThis" in context is the "this" in BaseSchema class
            this.isActive = true;
            if (baseThis.key) {
                this[baseThis.key] = this._id;
            }
            next();
        });

        this._schema.pre('update', function() {
            this.update({}, { $set: { updatedAt: new Date() } });
        });
    }

    get schema() {
        return this._schema;
    }
}

export { BaseSchema };