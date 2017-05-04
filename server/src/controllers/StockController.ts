import express = require("express");
import StockBusiness = require("./../app/business/StockBusiness");
import IBaseController = require("./BaseController");
import IStock = require("./../app/model/interfaces/IStock");
import UserBusiness = require("../app/business/UserBusiness");
import JsonResponse = require("../app/model/JsonResponse");
import { Options } from '../app/utility/Utility';

class StockController implements IBaseController<StockBusiness> {

    create(req: express.Request, res: express.Response): void {
        console.log('CREATE');
        try {
            var item: IStock = <IStock>req.body;
            var stockBusiness = new StockBusiness();
            var userId = req['payload']['_id'];
            var userBusiness = new UserBusiness();

            userBusiness.findById(req['payload']['_id'], (error, result) => {
                let userId = result['_id'];
                item['createdBy'] = userId;

                stockBusiness.create(item, (error, result) => {
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
        console.log('UPDATE STOCK');
        try {
            var stock: IStock = <IStock>req.body;
            var _id: string = req.params._id;
            var userId = req['payload']['_id'];
            var stockBusiness = new StockBusiness();
            var userBusiness = new UserBusiness();

            userBusiness.findById(req['payload']['_id'], (error, result) => {
                let userId = result['_id'];
                stock['updatedBy'] = userId;

                stockBusiness.update(_id, stock, (error, result) => {
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
            var stockBusiness = new StockBusiness();
            stockBusiness.delete(_id, (error, result) => {
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
            let stockBusiness = new StockBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query
            });

            console.log('RETRIVE OPTIONS');
            console.log(_options);

            stockBusiness.retrieve((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    stockBusiness.meta((error, result) => {
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
            let stockBusiness = new StockBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query,
                body: req.body
            });


            stockBusiness.query((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    stockBusiness.meta((error, result) => {
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

    search(req: express.Request, res: express.Response): void {
        console.log('STOCK SEARCH');
        try {
            let keyword: string = req.params._keyword;
            let _keyword: string = keyword || '';
            var stockBusiness = new StockBusiness();
            stockBusiness.search(_keyword, (error, result) => {
                let jsonObj = new JsonResponse(true, result);
                if (error) 
                    res.send({ "error": "error" });
                else 
                    res.status(200).json(jsonObj.return());
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    };

    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var stockBusiness = new StockBusiness();
            stockBusiness.findById(_id, (error, result) => {
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
export = StockController;
