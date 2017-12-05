import InventoryItem = require("../model/InventoryItem");
import IInventoryItem = require("../model/interfaces/IInventoryItem");
import InventoryItemSchema = require("../dataAccess/schemas/InventoryItemSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class InventoryItemRepository extends RepositoryBase<IInventoryItem> {
    constructor() {
        super(InventoryItemSchema);
    }
}

Object.seal(InventoryItemRepository);
export = InventoryItemRepository;
