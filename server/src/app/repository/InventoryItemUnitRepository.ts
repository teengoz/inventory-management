import InventoryItemUnit = require("../model/InventoryItemUnit");
import IInventoryItemUnit = require("../model/interfaces/IInventoryItemUnit");
import InventoryItemUnitSchema = require("../dataAccess/schemas/InventoryItemUnitSchema");
import RepositoryBase = require("./BaseRepository");

class InventoryItemUnitRepository extends RepositoryBase<IInventoryItemUnit> {
    constructor() {
        super(InventoryItemUnitSchema);
    }
}

Object.seal(InventoryItemUnitRepository);
export = InventoryItemUnitRepository;
