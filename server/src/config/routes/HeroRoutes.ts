/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

import express = require("express");
import HeroController = require("./../../controllers/HeroController");

var router = express.Router();
class HeroRoutes {
    private _heroController: HeroController;

    constructor() {
        this._heroController = new HeroController();
    }
    get routes() {
        var controller = this._heroController;

        router.get("/", controller.retrieve);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/:_id", controller.findById);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(HeroRoutes);
export = HeroRoutes;
