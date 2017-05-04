import express = require("express");
import StakeholderBusiness = require("../app/business/StakeholderBusiness");
import IBaseController = require("./BaseController");
import IStakeholder = require("../app/model/interfaces/IStakeholder");
import UserBusiness = require("../app/business/UserBusiness");
import StakeholderTypeBusiness = require("../app/business/StakeholderTypeBusiness");
import JsonResponse = require("../app/model/JsonResponse");
import { Options } from '../app/utility/Utility';

class StakeholderTypeController implements IBaseController<StakeholderBusiness> {

    create(req: express.Request, res: express.Response): void {
        console.log('CREATE');
        try {
            var item: IStakeholder = <IStakeholder>req.body;
            var stakeholderBusiness = new StakeholderBusiness();
            var userId = req['payload']['_id'];
            var stakeholderTypeId = req.body['stakeholderType.stakeholderTypeId'];

            var userBusiness = new UserBusiness();
            var stakeholderTypeBusiness = new StakeholderTypeBusiness();

            userBusiness.findById(userId, (error, result) => {
                let _userId = result['_id'];
                item['createdBy'] = _userId;
                item['stakeholderType'] = stakeholderTypeId;

                stakeholderTypeBusiness.findById(stakeholderTypeId, (error, result) => {
                    if (error || !result) {
                        console.log(error);
                        res.send({ "error": "error" });
                    }
                    else {
                        stakeholderBusiness.create(item, (error, result) => {
                            if (error) {
                                console.log(error);
                                res.send({ "error": "error" });
                            }
                            else res.send({ "success": true });
                        });
                    }
                });
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
            var item: IStakeholder = <IStakeholder>req.body;
            var stakeholderTypeId = req.body['stakeholderType.stakeholderTypeId'];
            if (item['stakeholderType.stakeholderTypeId']) {
                delete item['stakeholderType.stakeholderTypeId'];
            }
            var userId = req['payload']['_id'];

            var stakeholderBusiness = new StakeholderBusiness();
            var userBusiness = new UserBusiness();
            var stakeholderTypeBusiness = new StakeholderTypeBusiness();

            userBusiness.findById(userId, (error, result) => {
                let _userId = result['_id'];
                item['updatedBy'] = _userId;
                item['stakeholderType'] = stakeholderTypeId;

                stakeholderTypeBusiness.findById(stakeholderTypeId, (error, result) => {
                    if (error || !result) {
                        console.log(error);
                        res.send({ "error": "error" });
                    }
                    else {
                        stakeholderBusiness.update(_id, item, (error, result) => {
                            if (error) {
                                console.log(error);
                                res.send({ "error": "error" });
                            }
                            else res.send({ "success": true });
                        });
                    }
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
            var stakeholderTypeBusiness = new StakeholderBusiness();
            stakeholderTypeBusiness.delete(_id, (error, result) => {
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
            let stakeholderTypeBusiness = new StakeholderBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query
            });

            stakeholderTypeBusiness.retrieve((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    stakeholderTypeBusiness.meta((error, result) => {
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
            let stakeholderTypeBusiness = new StakeholderBusiness();
            let optionsInstance = new Options();
            let _options = optionsInstance.initOptions({
                query: req.query,
                body: req.body
            });

            stakeholderTypeBusiness.query((error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else {
                    let jsonObj = new JsonResponse(true, result);
                    stakeholderTypeBusiness.meta((error, result) => {
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
        console.log('SEARCH');
        try {
            let keyword: string = req.params._keyword;
            let _keyword: string = keyword || '';
            var stakeholderBusiness = new StakeholderBusiness();
            stakeholderBusiness.search(_keyword, (error, result) => {
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
            var stakeholderTypeBusiness = new StakeholderBusiness();
            stakeholderTypeBusiness.findById(_id, (error, result) => {
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
export = StakeholderTypeController;
