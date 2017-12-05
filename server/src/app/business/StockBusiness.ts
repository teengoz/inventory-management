import StockRepository = require("../repository/StockRepository");
import IStockBusiness = require("./interfaces/IStockBusiness");
import IStock = require("../model/interfaces/IStock");
import Stock = require("../model/Stock");


class StockBusiness implements IStockBusiness {
    private _stockRepository: StockRepository;

    constructor() {
        this._stockRepository = new StockRepository();
    }

    create(item: IStock, callback: (error: any, result: any) => void) {
        this._stockRepository.create(item, callback);
    }

    update(_id: string, item: IStock, callback: (error: any, result: any) => void) {
        this._stockRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else
                this._stockRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._stockRepository.delete(_id, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stockRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stockRepository.find(callback, _options);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._stockRepository.meta(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: IStock) => void) {
        this._stockRepository.findById(_id, callback);
    }

    getByIds(_ids: string[], callback: (error: any, result: IStock[]) => void) {
        this._stockRepository.getByIds(_ids, callback);
    }

    search(_keyword: string, callback: (error: any, result: any) => void) {
        if (!!_keyword) {
            let _options = {};
            _options['cond'] = {};
            _options['cond']['filter'] = {
                $or: [
                    { 'stockCode': new RegExp(_keyword, 'i') },
                    { 'stockName': new RegExp(_keyword, 'i') }
                ]
            };
            _options['cond']['type'] = 'search';

            this._stockRepository.find(callback, _options);
        } else {
            this._stockRepository.retrieve(callback, {});
        }
    }
}


Object.seal(StockBusiness);
export = StockBusiness;
