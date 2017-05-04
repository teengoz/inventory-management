import express = require("express");
import LemonController = require("./../../controllers/LemonController");

var router = express.Router();
class LemonRoutes {
    private _lemonController: LemonController;

    constructor () {
        this._lemonController = new LemonController();
    }
    get routes () {
        var controller = this._lemonController;

        router.get("/lemons", controller.retrieve);
        router.post("/lemons", controller.create);
        //router.get("/newlemon", controller.debugCreate);
        router.put("/lemons/:_id", controller.update);
        router.get("/lemons/:_id", controller.findById);
        router.delete("/lemons/:_id", controller.delete);

        return router;
    }


}

Object.seal(LemonRoutes);
export = LemonRoutes;