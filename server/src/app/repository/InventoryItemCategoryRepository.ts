import InventoryItemCategory = require("../model/InventoryItemCategory");
import IInventoryItemCategory = require("../model/interfaces/IInventoryItemCategory");
import InventoryItemCategorySchema = require("../dataAccess/schemas/InventoryItemCategorySchema");
import RepositoryBase = require("./BaseRepository");

class InventoryItemCategoryRepository extends RepositoryBase<IInventoryItemCategory> {
    constructor() {
        super(InventoryItemCategorySchema);
    }
}

Object.seal(InventoryItemCategoryRepository);
export = InventoryItemCategoryRepository;
