import express = require("express");
import InventoryItemDiscountController = require("../../controllers/InventoryItemDiscountController");

var router = express.Router();
class InventoryItemDiscountRoutes {
    private _inventoryItemDiscountController: InventoryItemDiscountController;

    constructor() {
        this._inventoryItemDiscountController = new InventoryItemDiscountController();
    }
    get routes() {
        var controller = this._inventoryItemDiscountController;

        router.get("/", controller.retrieve);
        router.post("/query", controller.query);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/:_id", controller.findById);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(InventoryItemDiscountRoutes);
export = InventoryItemDiscountRoutes;
