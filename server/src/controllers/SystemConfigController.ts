import express = require('express');
//import ISystemConfigBusiness = require('../app/business/interfaces/ISystemConfigBusiness');
//import IBaseController = require('./BaseController');
import ISystemConfig = require('../app/model/interfaces/ISystemConfig');

import SystemConfigBusiness = require('../app/business/SystemConfigBusiness');
import UserBusiness = require("../app/business/UserBusiness");

import JsonResponse = require('../app/model/JsonResponse');
import { Options } from '../app/utility/Utility';

class SystemConfigController {

    create(req: express.Request, res: express.Response): void {
        try {
            var systemConfigBusiness = new SystemConfigBusiness();
            var userBusiness = new UserBusiness();
            var item: ISystemConfig = <ISystemConfig>req.body;
            var userId = req['payload']['_id'];

            userBusiness.findById(req['payload']['_id'], (error, result) => {
                if (!error) {
                    let _userId = result['_id'];
                    item['createdBy'] = _userId;

                    systemConfigBusiness.create(item, (error, result) => {
                        if (error) {
                            console.log(error);
                            res.send({ "error": "error" });
                        }
                        else
                            res.send({ "success": true });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var systemConfigBusiness = new SystemConfigBusiness();
            var userBusiness = new UserBusiness();

            var items = req.body;
            var userId = req['payload']['_id'];
            var flag = true;

            userBusiness.findById(userId, (error, result) => {
                if (!error) {
                    let _userId = result['_id'];
                    
                    Object.keys(items).forEach((key, idx) => {
                        let value = items[key];
                        systemConfigBusiness.findByFieldName(key, (error, result) => {
                            let configObj = result;
                            if (configObj) {
                                let configId = configObj['systemConfigId'];
                                configObj['systemConfigValue'] =  value;
                                if (configObj['createdBy']) {
                                    delete configObj['createdBy'];
                                }
                                configObj['updatedBy'] = _userId;

                                systemConfigBusiness.update(configId, configObj, (error, result) => {
                                    if (error) {
                                        console.log(error);
                                        res.send({ "error": "error" });
                                    }
                                })
                            } else {
                                res.send({ "error": "error" });
                            }
                        });
                    });
                    if (flag) 
                        res.send({ "success": true });
                } else {
                    res.send({ "error": "error" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    retrieveConfigList(req: express.Request, res: express.Response): void {
        try {
            let systemConfigBusiness = new SystemConfigBusiness();
            //let list = req.body['list'];
            let list = req.body;

            if (Object.prototype.toString.call(list) === '[object Array]' && list.length > 0) {
                systemConfigBusiness.retrieveConfigList(list, (error, result) => {
                    if (error)
                        res.send({ "error": "error" });
                    else {
                        let jsonObj = new JsonResponse(true, result);
                        res.status(200).json(jsonObj.return());
                    }
                });
            } else {
                let jsonObj = new JsonResponse(true, {});
                res.status(200).json(jsonObj.return());
            }
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }
}
export = SystemConfigController;
