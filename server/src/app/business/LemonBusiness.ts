import LemonRepository = require("./../repository/LemonRepository");
import ILemonBusiness = require("./interfaces/ILemonBusiness");
import ILemon = require("./../model/interfaces/ILemon");
import Lemon = require("./../model/Lemon");


class LemonBusiness implements ILemonBusiness {
    private _lemonRepository: LemonRepository;

    constructor () {
        this._lemonRepository = new LemonRepository();
    }

    create (item: ILemon, callback: (error: any, result: any) => void) {
        this._lemonRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._lemonRepository.retrieve(callback);
    }

    update (_id: string, item: ILemon, callback: (error: any, result: any) => void) {

        this._lemonRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._lemonRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._lemonRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: ILemon) => void) {
        this._lemonRepository.findById(_id, callback);
    }

}


Object.seal(LemonBusiness);
export = LemonBusiness;