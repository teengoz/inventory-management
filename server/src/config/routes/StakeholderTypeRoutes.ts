import express = require("express");
import StakeholderTypeController = require("../../controllers/StakeholderTypeController");

var router = express.Router();
class StakeholderTypeRoutes {
    private _stakeholderTypeController: StakeholderTypeController;

    constructor() {
        this._stakeholderTypeController = new StakeholderTypeController();
    }
    get routes() {
        var controller = this._stakeholderTypeController;

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

Object.seal(StakeholderTypeRoutes);
export = StakeholderTypeRoutes;
