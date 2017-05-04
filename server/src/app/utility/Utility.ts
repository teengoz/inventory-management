import Constants = require('../../config/constants/constants');

class Transform {
    constructor(name: string = null) {
        
    }
    //To Camel Case
    transformToObject(object) {
        let _object:any = {};

        if (object) {
            if (Object.prototype.toString.call(object) === '[object Object]') {
                Object.keys(object).forEach((key, idx) => {
                    let originalName = key;
                    let transformName = this.toCamelCase(key);
                    _object[transformName] = object[originalName];
                });
            }
            else if (Object.prototype.toString.call(object) === '[object Array]') {
                _object = [];
                object.forEach((elm, idx) => {
                    let transformName = this.toCamelCase(elm);
                    _object.push(transformName);
                });
            }
        }

        return _object;
    }

    //To Snake Case
    transformToJSON(object) {
        let _object:any = {};

        if (object) {
            if (Object.prototype.toString.call(object) === '[object Object]') {
                Object.keys(object).forEach((key, idx) => {
                    let originalName = key;
                    let transformName = this.toSnakeCase(key);
                    _object[transformName] = object[originalName];
                });
            }
            else if (Object.prototype.toString.call(object) === '[object Array]') {
                _object = [];
                object.forEach((elm, idx) => {
                    let transformName = this.toSnakeCase(elm);
                    _object.push(transformName);
                });
            }
        }

        return _object;
    }

    private toSnakeCase(source) {
        return source.replace(/\.?([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
    }

    private toCamelCase(source) {
        return source.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
    }
}

class Options {
    initOptions(input) {
        let query = input['query'] || {};
        let body = input['body'] || {};

        //Extract param from request body, query
        let _cond = {};
        _cond['filter']    = body['filter'] || {};
        _cond['sort']      = body['sort'] || {};

        let _fields        = body['fields'] || [];
        let _limit         = (+query['limit'] >= 0) ? +query['limit'] : Constants.PER_PAGE;
        let _page          = query['page'] || 1;

        //Init param object
        let _options = {
            cond: _cond,
            fields: _fields,
            limit: _limit,
            page: _page
        }

        return _options;
    }
}

export { Transform, Options }
