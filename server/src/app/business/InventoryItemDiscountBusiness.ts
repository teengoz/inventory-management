import InventoryItemDiscountRepository = require("../repository/InventoryItemDiscountRepository");
import IInventoryItemDiscountBusiness = require("./interfaces/IInventoryItemDiscountBusiness");
import IInventoryItemDiscount = require("../model/interfaces/IInventoryItemDiscount");
import InventoryItem = require("../model/InventoryItem");


class InventoryItemBusiness implements IInventoryItemDiscountBusiness {
    private _inventoryItemDiscountRepository: InventoryItemDiscountRepository;

    constructor() {
        this._inventoryItemDiscountRepository = new InventoryItemDiscountRepository();
    }

    create(item: IInventoryItemDiscount, callback: (error: any, result: any) => void) {
        this._inventoryItemDiscountRepository.create(item, callback);
    }

    update(_id: string, item: IInventoryItemDiscount, callback: (error: any, result: any) => void) {

        this._inventoryItemDiscountRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else
                this._inventoryItemDiscountRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._inventoryItemDiscountRepository.delete(_id, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryItemDiscountRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryItemDiscountRepository.find(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: IInventoryItemDiscount) => void) {
        this._inventoryItemDiscountRepository.findById(_id, callback);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryItemDiscountRepository.meta(callback, _options);
    }
}


Object.seal(InventoryItemBusiness);
export = InventoryItemBusiness;
