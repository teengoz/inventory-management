import SystemConfigRepository = require("../repository/SystemConfigRepository");
import ISystemConfigBusiness = require("./interfaces/ISystemConfigBusiness");
import ISystemConfig = require("../model/interfaces/ISystemConfig");
import SystemConfig = require("../model/SystemConfig");

class SystemConfigBusiness implements ISystemConfigBusiness {
    private _systemconfigRepository: SystemConfigRepository;

    constructor() {
        this._systemconfigRepository = new SystemConfigRepository();
    }

    create(item: ISystemConfig, callback: (error: any, result: any) => void) {
        this._systemconfigRepository.create(item, callback);
    }

    update(_id: string, item: ISystemConfig, callback: (error: any, result: any) => void) {
        this._systemconfigRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);

            else
                this._systemconfigRepository.update(res._id, item, callback);

        });
    }

    retrieveConfigList(fieldNames: string[], callback: (error: any, result: any) => void) {
        let _options = {};
        _options['cond'] = {};
        _options['cond']['filter'] = { "systemConfigFieldName": { $in: fieldNames } };
        _options['cond']['type'] = '$in';
        _options['cond']['sort'] = { "systemConfigOrder": 1 };

        this._systemconfigRepository.find(callback, _options);
    }

    findByFieldName(fieldName: string, callback: (error: any, result: ISystemConfig) => void) {
        let _options = {};
        _options['cond'] = {};
        _options['cond']['filter'] = { 'systemConfigFieldName': fieldName };

        this._systemconfigRepository.find((error, result) => {
            console.log('resultresultresultresultresult')
            console.log(_options);
            console.log(result);
            callback(error, result[0]);
        }, _options);
    }
}


Object.seal(SystemConfigBusiness);
export = SystemConfigBusiness;
