import express = require("express");
import InventoryItemController = require("../../controllers/InventoryItemController");

var router = express.Router();
class InventoryItemRoutes {
    private _inventoryItemController: InventoryItemController;

    constructor() {
        this._inventoryItemController = new InventoryItemController();
    }
    
    get routes() {
        var controller = this._inventoryItemController;

        router.get("/", controller.retrieve);
        router.post("/query", controller.query);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/search", controller.search);
        router.get("/search/:_keyword", controller.search);
        router.get("/:_id", controller.findById);
        router.get("/code/:_code", controller.findCode);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(InventoryItemRoutes);
export = InventoryItemRoutes;
