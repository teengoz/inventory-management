import express = require("express");
import StockController = require("../../controllers/StockController");

var router = express.Router();
class StockRoutes {
    private _stockController: StockController;

    constructor() {
        this._stockController = new StockController();
    }
    get routes() {
        var controller = this._stockController;

        router.get("/", controller.retrieve);
        router.post("/query", controller.query);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/search", controller.search);
        router.get("/search/:_keyword", controller.search);
        router.get("/:_id", controller.findById);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(StockRoutes);
export = StockRoutes;
