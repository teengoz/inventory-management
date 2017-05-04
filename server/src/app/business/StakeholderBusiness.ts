import StakeholderRepository = require("../repository/StakeholderRepository");
import IStakeholderBusiness = require("./interfaces/IStakeholderBusiness");
import IStakeholder = require("../model/interfaces/IStakeholder");
import Stakeholder = require("../model/Stakeholder");

class StakeholderBusiness implements IStakeholderBusiness {
    private _stakeholderRepository: StakeholderRepository;

    constructor() {
        this._stakeholderRepository = new StakeholderRepository();
    }

    create(item: IStakeholder, callback: (error: any, result: any) => void) {
        this._stakeholderRepository.create(item, callback);
    }

    update(_id: string, item: IStakeholder, callback: (error: any, result: any) => void) {
        this._stakeholderRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else if (res)
                this._stakeholderRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._stakeholderRepository.delete(_id, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stakeholderRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stakeholderRepository.find(callback, _options);
    }

    search(_keyword: string, callback: (error: any, result: any) => void) {
        if (!!_keyword) {
            let _options = {};
            _options['cond'] = {};
            _options['cond']['filter'] = {
                $or: [
                    { 'stakeholderCode': new RegExp(_keyword, 'i') },
                    { 'stakeholderName': new RegExp(_keyword, 'i') }
                ]
            };
            _options['cond']['type'] = 'search';

            this._stakeholderRepository.find(callback, _options);
        } else {
            this._stakeholderRepository.retrieve(callback, {});
        }
    }

    findById(_id: string, callback: (error: any, result: IStakeholder) => void) {
        this._stakeholderRepository.findById(_id, callback);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stakeholderRepository.meta(callback, _options);
    }
}


Object.seal(StakeholderBusiness);
export = StakeholderBusiness;
