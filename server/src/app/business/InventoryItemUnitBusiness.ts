import InventoryItemUnitRepository = require("../repository/InventoryItemUnitRepository");
import IInventoryItemUnitBusiness = require("./interfaces/IInventoryItemUnitBusiness");
import IInventoryItemUnit = require("../model/interfaces/IInventoryItemUnit");
import InventoryItemUnit = require("../model/InventoryItemUnit");


class InventoryItemUnitBusiness implements IInventoryItemUnitBusiness {
    private _inventoryitemunitRepository: InventoryItemUnitRepository;

    constructor() {
        this._inventoryitemunitRepository = new InventoryItemUnitRepository();
    }

    create(item: IInventoryItemUnit, callback: (error: any, result: any) => void) {
        this._inventoryitemunitRepository.create(item, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options ?: any) {
        let _options = options || {};

        this._inventoryitemunitRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryitemunitRepository.find(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: IInventoryItemUnit) => void) {
        this._inventoryitemunitRepository.findById(_id, callback);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryitemunitRepository.meta(callback, _options);
    }

    update(_id: string, item: IInventoryItemUnit, callback: (error: any, result: any) => void) {
        this._inventoryitemunitRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else if (res)
                this._inventoryitemunitRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._inventoryitemunitRepository.delete(_id, callback);
    }
}


Object.seal(InventoryItemUnitBusiness);
export = InventoryItemUnitBusiness;
