import express = require("express");
import TransactionController = require("../../controllers/TransactionController");

var router = express.Router();
class TransactionRoutes {
    private _inventoryItemController: TransactionController;

    constructor() {
        this._inventoryItemController = new TransactionController();
    }

    get routes() {
        var controller = this._inventoryItemController;

        router.get("/", controller.retrieve);
        router.post("/query", controller.query);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.put("/:_id/record/:_record", controller.record);
        // router.get("/search", controller.search);
        // router.get("/search/:_keyword", controller.search);
        router.get("/:_id", controller.findById);
        //router.get("/code/:_code", controller.findCode);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(TransactionRoutes);
export = TransactionRoutes;
