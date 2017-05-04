import express = require("express");
import StakeholderController = require("../../controllers/StakeholderController");

var router = express.Router();
class StakeholderRoutes {
    private _stakeholderController: StakeholderController;

    constructor() {
        this._stakeholderController = new StakeholderController();
    }
    get routes() {
        var controller = this._stakeholderController;

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

Object.seal(StakeholderRoutes);
export = StakeholderRoutes;
