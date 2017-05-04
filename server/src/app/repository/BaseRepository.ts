import IRead = require('./interfaces/Read');
import IWrite = require('./interfaces/Write');
import Constants = require('../../config/constants/constants');
import { Transform } from '../utility/Utility';

import mongoose = require("mongoose");

class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<T>;
    private typeArray = ['$in', '=', 'search'];

    constructor(schemaModel: mongoose.Model<T>) {
        this._model = schemaModel;
    }

    create(item: T, callback: (error: any, result: any) => void) {
        let _item = item;
        this._model.create(_item, callback);
    }

    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        let _item = item;

        if (_item['parent'] && (_id.toString() == _item['parent'].toString())) {
            callback('Error: _id == parent', null);
            return;
        }

        this._model.update({ _id: _id }, _item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));

    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        mongoose.set('debug', true);
        let _page = options['page'] || 1;
        let _limit = (+options['limit'] >= 0) ? +options['limit'] : Constants.PER_PAGE;
        let _fields = options['fields'] || [];

        let _aggLookup = this.generateLookup();
        let _aggLimit = (_limit > 0) ? [{ $limit: +_limit }] : [];
        let _aggSkip = [{ $skip: (_page - 1) * _limit }];
        let tempProject = this.generateProject(_fields);
        let _aggProject = (Object.keys(tempProject).length) ? [{ $project: tempProject }] : [];

        this._model
            .aggregate([
                ..._aggLookup,
                ..._aggSkip,
                ..._aggLimit,
                ..._aggProject
            ])
            .exec(callback);
    }

    find(callback?: (error: any, result: T[]) => void, options?: any) {
        mongoose.set('debug', true);
        let _cond = options['cond'] || {};
        let _filter = _cond['filter'] || {};
        let _regFilter = (<any>Object).assign({}, _filter);
        let _sort = _cond['sort'] || {};
        let _fields = options['fields'] || [];
        let _page = options['page'] || 1;
        let _limit = (+options['limit'] >= 0) ? +options['limit'] : Constants.PER_PAGE;

        if (!(_cond['type'] && this.typeArray.indexOf(_cond['type']) >= 0)) {
            for (let propName in _regFilter) {
                _regFilter[propName] = new RegExp(_regFilter[propName], "i");
            }
        }

        let _aggLookup = this.generateLookup();
        let _aggSort = (Object.keys(_sort).length) ? [{ $sort: _sort }] : [];
        let _aggLimit = (_limit > 0) ? [{ $limit: +_limit }] : [];
        let _aggFilter = (Object.keys(_regFilter).length) ? [{ $match: _regFilter }] : [];
        let _aggSkip = [{ $skip: (_page - 1) * _limit }];
        let tempProject = this.generateProject(_fields);
        let _aggProject = (Object.keys(tempProject).length) ? [{ $project: tempProject }] : [];

        this._model
            .aggregate([
                ..._aggLookup,
                ..._aggFilter,
                ..._aggSort,
                ..._aggSkip,
                ..._aggLimit,
                ..._aggProject
            ])
            .exec(callback);
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        mongoose.set('debug', true);

        let _aggLookup = this.generateLookup();
        let _aggFilter = [{ $match: { '_id': this.toObjectId(_id) } }];
        let tempProject = this.generateProject();
        let _aggProject = (Object.keys(tempProject).length) ? [{ $project: tempProject }] : [];

        this._model
            .aggregate([
                ..._aggLookup,
                ..._aggFilter,
                ..._aggProject
            ])
            .exec((error, result) => {
                let item: T = (result[0]) ? result[0] : <T>{};
                callback(error, item);
            });
    }

    meta(callback: (error: any, result) => void, options?: any) {
        //mongoose.set('debug', true);
        let _cond = options['cond'] || {};
        let _filter = _cond['filter'] || {};
        let _regFilter = (<any>Object).assign({}, _filter);
        let _sort = _cond['sort'] || {};
        let _page = options['page'] || 1;
        let _limit = (+options['limit'] >= 0) ? +options['limit'] : Constants.PER_PAGE;

        for (let propName in _filter) {
            _regFilter[propName] = new RegExp(_regFilter[propName], "i");
        }

        let _aggLookup = this.generateLookup();
        let _aggSort = (Object.keys(_sort).length) ? [{ $sort: _sort }] : [];
        let _aggLimit = (_limit > 0) ? [{ $limit: +_limit }] : [];
        let _aggFilter = (Object.keys(_regFilter).length) ? [{ $match: _regFilter }] : [];
        let _aggSkip = [{ $skip: (_page - 1) * _limit }];

        let _result = {};

        this._model
            .aggregate([
                ..._aggLookup,
                ..._aggFilter,
                ...[
                    {
                        $count: 'count'
                    }
                ]
            ])
            .exec((error, result) => {
                let length = (result[0]) ? result[0]['count'] : 0;
                _result['count'] = length;
                let resultDivision = length / _limit;
                let downwardDivision = Math.floor(length / _limit);
                let totalPage = (downwardDivision < resultDivision) ? (downwardDivision + 1) : downwardDivision;
                _result['totalPage'] = (totalPage != Infinity) ? totalPage : 1;
                _result['currentPage'] = _page;
                _result['query'] = _filter;
                _result['limit'] = _limit;
                callback(error, _result);
            });
    }

    private generateLookup() {
        let _lookup = [];
        this._model.schema['options']['refs'].forEach((elm, idx) => {
            let _temp = {
                $lookup: {
                    from: elm['model'],
                    localField: elm['key']['localField'],
                    foreignField: elm['key']['foreignField'],
                    as: elm['as'] || elm['key']['localField']
                }
            };
            _lookup.push(_temp);
        })
        return _lookup;
    }

    private generateProject(selectFields?: string[]) {
        let _project = {};
        let hiddenFields = this._model.schema['options']['hiddenFields'];
        let localFields = [];

        if (Object.prototype.toString.call(selectFields) === '[object Array]' && selectFields.length) {
            selectFields.forEach((elm) => {
                if (hiddenFields.indexOf(elm) < 0) {
                    _project[elm] = 1;
                }
            })
        } else {
            let schemafFields = Object.keys(this._model.schema['obj']);
            this._model.schema['options']['refs'].forEach((elm, idx) => {
                elm['fields'].forEach((fieldName) => {
                    let _prefix = elm['as'] || elm['key']['localField'];
                    _project[_prefix + '.' + fieldName] = 1;
                    localFields.push(_prefix);
                })
            });

            schemafFields.forEach((elm) => {
                if (hiddenFields.indexOf(elm) < 0 && localFields.indexOf(elm) < 0) {
                    _project[elm] = 1;
                }
            })

            // if (hiddenFields.indexOf('_id') && !_project.hasOwnProperty('_id')) {
            //     _project['_id'] = 0;
            // }
        }

        return _project;
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(_id);
    }
}

export = RepositoryBase;
