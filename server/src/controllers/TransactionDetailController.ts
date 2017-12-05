import express = require("express");
import TransactionBusiness = require("./../app/business/TransactionBusiness");
import InventoryItemCategoryBusiness = require('../app/business/InventoryItemCategoryBusiness');
import InventoryItemUnitBusiness = require('../app/business/InventoryItemUnitBusiness');
import IBaseController = require("./BaseController");
import ITransaction = require("./../app/model/interfaces/ITransaction");
import UserBusiness = require("../app/business/UserBusiness");
import JsonResponse = require("../app/model/JsonResponse");
import { Options } from '../app/utility/Utility';

class TransactionController implements IBaseController<TransactionBusiness> {

    create(req: express.Request, res: express.Response): void {
        console.log('CREATE');
        try {
            let transactionBusiness = new TransactionBusiness();
            transactionBusiness.create(req, (error, result) => {
                if (error) {
                    //console.log(error);
                    res.send({ "error": "error" });
                }
                else
                    res.send({ "success": true });
            })
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    update = (req: express.Request, res: express.Response): void => {
        console.log('UPDATE');
        try {
            let transactionBusiness = new TransactionBusiness();
            transactionBusiness.updateByRequestData(req, (error, result) => {
                if (error) {
                    console.log(error);
                    res.send({ "error": "error" });
                }
                else
                    res.send({ "success": true });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    private validForeignData(inventoryItemCategoryId, callback) {
        var inventoryItemCategoryBusiness = new InventoryItemCategoryBusiness();
        var userBusiness = new UserBusiness();
        if (inventoryItemCategoryId) {
            inventoryItemCategoryBusiness.findById(inventoryItemCategoryId, (error, result) => {
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
            var transactionBusiness = new TransactionBusiness();
            transactionBusiness.delete(_id, (error) => {
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
            let transactionBusiness = new TransactionBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query
            });

            console.log('RETRIVE OPTIONS');

            transactionBusiness.retrieve((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    transactionBusiness.meta((error, result) => {
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
            let transactionBusiness = new TransactionBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query,
                body: req.body
            });


            transactionBusiness.query((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    transactionBusiness.meta((error, result) => {
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

    // search(req: express.Request, res: express.Response): void {
    //     try {
    //         let keyword: string = req.params._keyword;
    //         let _keyword: string = keyword || '';
    //         var transactionBusiness = new TransactionBusiness();
    //         transactionBusiness.search(_keyword, (error, result) => {
    //             let jsonObj = new JsonResponse(true, result);
    //             if (error)
    //                 res.send({ "error": "error" });
    //             else
    //                 res.status(200).json(jsonObj.return());
    //         });
    //     }
    //     catch (e) {
    //         console.log(e);
    //         res.send({ "error": "error in your request" });
    //
    //     }
    // };

    findById(req: express.Request, res: express.Response): void {
        try {
            var _id: string = req.params._id;
            var transactionBusiness = new TransactionBusiness();
            transactionBusiness.findById(_id, (error, result) => {
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
export = TransactionController;
