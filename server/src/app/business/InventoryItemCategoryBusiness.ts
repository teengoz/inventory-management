import InventoryItemCategoryRepository = require("../repository/InventoryItemCategoryRepository");
import IInventoryItemCategoryBusiness = require("./interfaces/IInventoryItemCategoryBusiness");
import IInventoryItemCategory = require("../model/interfaces/IInventoryItemCategory");
import InventoryItemCategory = require("../model/InventoryItemCategory");


class InventoryItemCategoryBusiness implements IInventoryItemCategoryBusiness {
    private _inventoryItemCategoryRepository: InventoryItemCategoryRepository;

    constructor() {
        this._inventoryItemCategoryRepository = new InventoryItemCategoryRepository();
    }

    create(item: IInventoryItemCategory, callback: (error: any, result: any) => void) {
        this._inventoryItemCategoryRepository.create(item, callback);
    }

    update(_id: string, item: IInventoryItemCategory, callback: (error: any, result: any) => void) {
        this._inventoryItemCategoryRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else if (res)
                this._inventoryItemCategoryRepository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._inventoryItemCategoryRepository.delete(_id, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryItemCategoryRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryItemCategoryRepository.find(callback, _options);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryItemCategoryRepository.meta(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: IInventoryItemCategory) => void) {
        this._inventoryItemCategoryRepository.findById(_id, callback);
    }
}


Object.seal(InventoryItemCategoryBusiness);
export = InventoryItemCategoryBusiness;
