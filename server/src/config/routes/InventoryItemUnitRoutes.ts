import express = require("express");
import InventoryItemUnitController = require("../../controllers/InventoryItemUnitController");

var router = express.Router();
class InventoryItemUnitRoutes {
    private _inventoryItemUnitController: InventoryItemUnitController;

    constructor() {
        this._inventoryItemUnitController = new InventoryItemUnitController();
    }
    get routes() {
        var controller = this._inventoryItemUnitController;

        router.get("/", controller.retrieve);
        router.get("/hint/:_keyword", controller.hint);
        router.get("/hint/", controller.hint);
        router.post("/query", controller.query);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/:_id", controller.findById);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(InventoryItemUnitRoutes);
export = InventoryItemUnitRoutes;
