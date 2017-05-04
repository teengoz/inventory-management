import express = require("express");
import InventoryItemUnitBusiness = require("../app/business/InventoryItemUnitBusiness");
import StockBusiness = require("../app/business/StockBusiness");
import UserBusiness = require("../app/business/UserBusiness");
import IBaseController = require("./BaseController");
import IInventoryItemUnit = require("../app/model/interfaces/IInventoryItemUnit");
import JsonResponse = require("../app/model/JsonResponse");
import { Options } from '../app/utility/Utility';

class InventoryItemUnitController implements IBaseController<InventoryItemUnitBusiness> {

    create(req: express.Request, res: express.Response): void {
        console.log('CREATE');
        try {
            var unit: IInventoryItemUnit = <IInventoryItemUnit>req.body;
            var inventoryItemUnitBusiness = new InventoryItemUnitBusiness();
            var userId = req['payload']['_id'];
            var userBusiness = new UserBusiness();

            
            userBusiness.findById(req['payload']['_id'], (error, result) => {
                let userId = result['_id'];
                unit['createdBy'] = userId;

                inventoryItemUnitBusiness.create(unit, (error, result) => {
                    if (error) {
                        console.log(error);
                        res.send({ "error": "error" });
                    }
                    else res.send({ "success": true });
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    update(req: express.Request, res: express.Response): void {
        console.log('UPDATE unit');
        try {
            var unit: IInventoryItemUnit = <IInventoryItemUnit>req.body;
            var _id: string = req.params._id;
            var userId = req['payload']['_id'];
            var userBusiness = new UserBusiness();
            var inventoryItemUnitBusiness = new InventoryItemUnitBusiness();

            

            userBusiness.findById(userId, (error, result) => {
                let userId = result['_id'];
                unit['updatedBy'] = userId;

                inventoryItemUnitBusiness.update(_id, unit, (error, result) => {
                    if (error) res.send({ "error": "error" });
                    else res.send({ "success": true });
                });
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
            var inventoryItemUnitBusiness = new InventoryItemUnitBusiness();
            inventoryItemUnitBusiness.delete(_id, (error, result) => {
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
        console.log('RETRIVE');
        try {
            let inventoryItemUnitBusiness = new InventoryItemUnitBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query
            });

            inventoryItemUnitBusiness.retrieve((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    inventoryItemUnitBusiness.meta((error, result) => {
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
            console.log(req.body);
            let inventoryItemUnitBusiness = new InventoryItemUnitBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query,
                body: req.body
            });

            inventoryItemUnitBusiness.query((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    inventoryItemUnitBusiness.meta((error, result) => {
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
        console.log('HINT HINT');
        try {
            let inventoryItemUnitBusiness = new InventoryItemUnitBusiness();
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
                        'inventoryItemUnitId',
                        'inventoryItemUnitName'
                    ],
                    sort: { 'inventoryItemUnitName': 1 }
                },
                query: {
                    limit: 0
                }
            });

            inventoryItemUnitBusiness.query((error, result) => {
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
            var inventoryItemUnitBusiness = new InventoryItemUnitBusiness();
            inventoryItemUnitBusiness.findById(_id, (error, result) => {
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
export = InventoryItemUnitController;
