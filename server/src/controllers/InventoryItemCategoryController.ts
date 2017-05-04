import express = require('express');
import InventoryItemCategoryBusiness = require('../app/business/InventoryItemCategoryBusiness');
import UserBusiness = require("../app/business/UserBusiness");
import IBaseController = require('./BaseController');
import IInventoryItemCategory = require('../app/model/interfaces/IInventoryItemCategory');
import JsonResponse = require('../app/model/JsonResponse');
import { Options } from '../app/utility/Utility';

class InventoryItemCategoryController implements IBaseController<InventoryItemCategoryBusiness> {

    create(req: express.Request, res: express.Response): void {
        console.log('CREATE');
        try {
            var item = req.body;
            var userId = req['payload']['_id'];
            var inventoryItemCategoryId = req.body['parent.inventoryItemCategoryId'];

            var userBusiness = new UserBusiness();
            var inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();

            userBusiness.findById(userId, (error, result) => {
                let _userId = result['_id'];
                item['createdBy'] = _userId;

                if (inventoryItemCategoryId) {
                    inventoryItemCategoryBusiness.findById(inventoryItemCategoryId, (error, result) => {
                        if (error || !result) {
                            res.send({ "error": "error" });
                        } else {
                            let _inventoryItemCategoryId = result['_id'];
                            item['parent'] = _inventoryItemCategoryId;
                            inventoryItemCategoryBusiness.create(item, (error, result) => {
                                if (error) {
                                    console.log(error);
                                    res.send({ "error": "error" });
                                }
                                else res.send({ "success": true });
                            });
                        }
                    });
                } else {
                    inventoryItemCategoryBusiness.create(item, (error, result) => {
                        if (error) {
                            console.log(error);
                            res.send({ "error": "error" });
                        }
                        else res.send({ "success": true });
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
        console.log('UPDATE');
        try {
            var _id: string = req.params._id;
            var item = req.body;
            var inventoryItemCategoryId = req.body['parent.inventoryItemCategoryId'];
            delete item['parent.inventoryItemCategoryId'];

            var userId = req['payload']['_id'];

            var userBusiness = new UserBusiness();
            var inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();

            userBusiness.findById(userId, (error, result) => {
                let _userId = result['_id'];
                item['updatedBy'] = _userId;

                if (inventoryItemCategoryId) {
                    inventoryItemCategoryBusiness.findById(inventoryItemCategoryId, (error, result) => {
                        if (error || !result) {
                            console.log(error);
                            res.send({ "error": "error" });
                        }
                        else {
                            let _inventoryItemCategoryId = result['_id'];
                            item['parent'] = _inventoryItemCategoryId;
                            inventoryItemCategoryBusiness.update(_id, item, (error, result) => {
                                if (error) {
                                    console.log(error);
                                    res.send({ "error": "error" });
                                }
                                else res.send({ "success": true });
                            });
                        }
                    });
                } else {
                    console.log(item);
                    item['parent'] = null;
                    inventoryItemCategoryBusiness.update(_id, item, (error, result) => {
                        if (error) {
                            console.log(error);
                            res.send({ "error": "error" });
                        }
                        else res.send({ "success": true });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    delete(req: express.Request, res: express.Response): void {
        console.log('DELETE');
        try {
            var _id: string = req.params._id;
            var inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();
            inventoryItemCategoryBusiness.delete(_id, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": true });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            let inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query
            });

            inventoryItemCategoryBusiness.retrieve((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    inventoryItemCategoryBusiness.meta((error, result) => {
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
            let inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query,
                body: req.body
            });

            inventoryItemCategoryBusiness.query((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    inventoryItemCategoryBusiness.meta((error, result) => {
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

    hint(req: express.Request, res: express.Response): void {
        try {
            let inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();
            let optionsInstance = new Options();
            let _keyword: string = req.params._keyword || '';
            // let _filter = {
            //     'inventoryItemCategoryId': {
            //         $ne:
            //     }
            // }
            let _filter = (_keyword) ? { stakeholder_type_name: _keyword } : {};
            let _options = optionsInstance.initOptions({
                body: {
                    filter: _filter,
                    fields: [
                        'inventoryItemCategoryId',
                        'inventoryItemCategoryName'
                    ],
                    sort: { 'inventoryItemCategoryName': 1 }
                },
                query: {
                    limit: 0
                }
            });

            inventoryItemCategoryBusiness.query((error, result) => {
                let jsonObj = new JsonResponse(true, result);
                if (error)
                    res.send({ "error": "error" });
                else
                    res.status(200).json(jsonObj.return());
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
            var inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();
            inventoryItemCategoryBusiness.findById(_id, (error, result) => {
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
export = InventoryItemCategoryController;
