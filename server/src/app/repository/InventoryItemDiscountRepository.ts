import InventoryItemDiscount = require("../model/InventoryItemDiscount");
import IInventoryItemDiscount = require("../model/interfaces/IInventoryItemDiscount");
import InventoryItemDiscountSchema = require("../dataAccess/schemas/InventoryItemDiscountSchema");
import RepositoryBase = require("./BaseRepository");

class InventoryItemDiscountRepository extends RepositoryBase<IInventoryItemDiscount> {
	constructor() {
		super(InventoryItemDiscountSchema);
	}
}

Object.seal(InventoryItemDiscountRepository);
export = InventoryItemDiscountRepository;
