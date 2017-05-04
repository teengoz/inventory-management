import express = require("express");
import InventoryItemDiscountBusiness = require("./../app/business/InventoryItemDiscountBusiness");
import InventoryItemBusiness = require('../app/business/InventoryItemBusiness');
//import InventoryItemUnitBusiness = require('../app/business/InventoryItemUnitBusiness');
import UserBusiness = require("../app/business/UserBusiness");

import IBaseController = require("./BaseController");
import IInventoryItemDiscount = require("./../app/model/interfaces/IInventoryItemDiscount");
import JsonResponse = require("../app/model/JsonResponse");
import { Options } from '../app/utility/Utility';

class InventoryItemDiscountController implements IBaseController<InventoryItemDiscountBusiness> {

    create = (req: express.Request, res: express.Response): void => {
        console.log('CREATE');
        try {
            var item: IInventoryItemDiscount = <IInventoryItemDiscount>req.body;
            var userId = req['payload']['_id'];
            var inventoryItemId = req.body['inventoryItem.inventoryItemId'];

            var inventoryItemDiscountBusiness = new InventoryItemDiscountBusiness();
            var inventoryItemBusiness = new InventoryItemBusiness();
            var userBusiness = new UserBusiness();

            userBusiness.findById(userId, (error, result) => {
                let _userId = result['_id'];
                item['createdBy'] = _userId;

                this.validForeignData(inventoryItemId, (error, result) => {
                    if (!error) {
                        item['inventoryItem'] = inventoryItemId;
                        inventoryItemDiscountBusiness.create(item, (error, result) => {
                            if (error || !result || !result.length) {
                                console.log(error);
                                res.send({ "error": "error" });
                            }
                            else
                                res.send({ "success": true });
                        });

                    } else {
                        res.send({ "error": "error" });
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    update = (req: express.Request, res: express.Response): void => {
        console.log('UPDATE STOCK');
        try {
            var _id: string = req.params._id;
            var item: IInventoryItemDiscount = <IInventoryItemDiscount>req.body;
            var userId = req['payload']['_id'];
            var inventoryItemId = req.body['inventoryItem.inventoryItemId'];

            var inventoryItemDiscountBusiness = new InventoryItemDiscountBusiness();
            var inventoryItemBusiness = new InventoryItemBusiness();
            var userBusiness = new UserBusiness();

            userBusiness.findById(userId, (error, result) => {
                let _userId = result['_id'];
                item['updatedBy'] = _userId;

                this.validForeignData(inventoryItemId, (error, result) => {
                    if (!error) {
                        item['inventoryItem'] = inventoryItemId;
                        inventoryItemDiscountBusiness.update(_id, item, (error, result) => {
                            if (error || !result || !result.length) {
                                console.log(error);
                                res.send({ "error": "error" });
                            }
                            else
                                res.send({ "success": true });
                        });

                    } else {
                        res.send({ "error": "error" });
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    private validForeignData(inventoryItemId, callback) {
        var inventoryItemDiscountBusiness = new InventoryItemDiscountBusiness();
        var inventoryItemBusiness = new InventoryItemBusiness();

        if (inventoryItemId) {
            inventoryItemBusiness.findById(inventoryItemId, (error, result) => {
                callback(error, result);
            });
        } else {
            callback('error', null);
        }
    }

    delete(req: express.Request, res: express.Response): void {
        console.log('DELETE');
        try {
            var _id: string = req.params._id;
            var inventoryItemDiscountBusiness = new InventoryItemDiscountBusiness();
            inventoryItemDiscountBusiness.delete(_id, (error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": true });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            let inventoryItemDiscountBusiness = new InventoryItemDiscountBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query
            });

            console.log('RETRIVE OPTIONS');

            inventoryItemDiscountBusiness.retrieve((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    inventoryItemDiscountBusiness.meta((error, result) => {
                        let _meta = {
                            total: result.count,
                            total_page: result.totalPage,
                            current_page: result.currentPage,
                            query: result.query,
                            limit: result.limit
                        };
                        jsonObj.meta(_meta);

                        if (error)
                            res.send({ "error": "error" });
                        else
                            // setTimeout(() => {
                            //     res.status(200).json(jsonObj.return());
                            // }, 6000);
                            res.status(200).json(jsonObj.return());
                    }, _options);
                }
            }, _options);
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    query(req: express.Request, res: express.Response): void {
        console.log('QUERY');
        try {
            let inventoryItemDiscountBusiness = new InventoryItemDiscountBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query,
                body: req.body
            });


            inventoryItemDiscountBusiness.query((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    inventoryItemDiscountBusiness.meta((error, result) => {
                        let _meta = {
                            total: result.count,
                            total_page: result.totalPage,
                            current_page: result.currentPage,
                            query: result.query,
                            limit: result.limit
                        };
                        jsonObj.meta(_meta);

                        if (error)
                            res.send({ "error": "error" });
                        else
                            // setTimeout(() => {
                            //     res.status(200).json(jsonObj.return());
                            // }, 6000);
                            res.status(200).json(jsonObj.return());
                    }, _options);
                }
            }, _options);
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var inventoryItemDiscountBusiness = new InventoryItemDiscountBusiness();
            inventoryItemDiscountBusiness.findById(_id, (error, result) => {
                let jsonObj = new JsonResponse(true, result);
                if (error) res.send({ "error": "error" });
                else res.status(200).json(jsonObj.return());
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
}
export = InventoryItemDiscountController;
