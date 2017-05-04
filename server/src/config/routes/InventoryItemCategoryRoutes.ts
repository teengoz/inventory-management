import express = require("express");
import InventoryItemCategoryController = require("../../controllers/InventoryItemCategoryController");

var router = express.Router();
class InventoryItemCategoryRoutes {
    private _inventoryItemCategoryController: InventoryItemCategoryController;

    constructor() {
        this._inventoryItemCategoryController = new InventoryItemCategoryController();
    }
    get routes() {
        var controller = this._inventoryItemCategoryController;

        router.get("/", controller.retrieve);
        router.get("/hint/:_keyword", controller.hint);
        router.get("/hint/", controller.hint);
        router.get("/:_id", controller.findById);
        router.post("/query", controller.query);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(InventoryItemCategoryRoutes);
export = InventoryItemCategoryRoutes;
