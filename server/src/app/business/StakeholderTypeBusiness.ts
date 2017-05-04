import StakeholderTypeRepository = require("../repository/StakeholderTypeRepository");
import IStakeholderTypeBusiness = require("./interfaces/IStakeholderTypeBusiness");
import IStakeholderType = require("../model/interfaces/IStakeholderType");
import StakeholderType = require("../model/StakeholderType");


class StakeholderTypeBusiness implements IStakeholderTypeBusiness {
    private _stakeholderTypeRepository: StakeholderTypeRepository;

    constructor() {
        this._stakeholderTypeRepository = new StakeholderTypeRepository();
    }

    create(item: IStakeholderType, callback: (error: any, result: any) => void) {
        this._stakeholderTypeRepository.create(item, callback);
    }

    update(_id: string, item: IStakeholderType, callback: (error: any, result: any) => void) {
        this._stakeholderTypeRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else if (res)
                this._stakeholderTypeRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._stakeholderTypeRepository.delete(_id, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stakeholderTypeRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stakeholderTypeRepository.find(callback, _options);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stakeholderTypeRepository.meta(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: IStakeholderType) => void) {
        this._stakeholderTypeRepository.findById(_id, callback);
    }
}


Object.seal(StakeholderTypeBusiness);
export = StakeholderTypeBusiness;
