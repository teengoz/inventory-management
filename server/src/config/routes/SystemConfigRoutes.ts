import express = require('express');
import SystemConfigController = require('../../controllers/SystemConfigController');

var router = express.Router();
class SystemConfigRoutes {
    private _systemConfigController: SystemConfigController;

    constructor() {
        this._systemConfigController = new SystemConfigController();
    }
    get routes() {
        var controller = this._systemConfigController;

        router.post('/create', controller.create);
        router.post('/getConfigs', controller.retrieveConfigList);
        router.put('/updateConfigs', controller.update);

        return router;
    }
}

Object.seal(SystemConfigRoutes);
export = SystemConfigRoutes;
