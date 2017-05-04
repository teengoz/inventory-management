import express = require('express');
import StakeholderTypeBusiness = require('../app/business/StakeholderTypeBusiness');
import UserBusiness = require("../app/business/UserBusiness");
import IBaseController = require('./BaseController');
import IStakeholderType = require('../app/model/interfaces/IStakeholderType');
import JsonResponse = require('../app/model/JsonResponse');
import { Options } from '../app/utility/Utility';

class StakeholderTypeController implements IBaseController<StakeholderTypeBusiness> {

    create(req: express.Request, res: express.Response): void {
        console.log('CREATE');
        try {
            var stakeholderTypeBusiness = new StakeholderTypeBusiness();
            var userBusiness = new UserBusiness();
            var item: IStakeholderType = <IStakeholderType>req.body;
            var userId = req['payload']['_id'];

            userBusiness.findById(req['payload']['_id'], (error, result) => {
                let userId = result['_id'];
                item['createdBy'] = userId;

                stakeholderTypeBusiness.create(item, (error, result) => {
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
        console.log('UPDATE');
        try {
            var stakeholderTypeBusiness = new StakeholderTypeBusiness();
            var userBusiness = new UserBusiness();
            var item: IStakeholderType = <IStakeholderType>req.body;
            var _id: string = req.params._id;
            var userId = req['payload']['_id'];

            userBusiness.findById(req['payload']['_id'], (error, result) => {
                let userId = result['_id'];
                item['updatedBy'] = userId;

                stakeholderTypeBusiness.update(_id, item, (error, result) => {
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

    delete(req: express.Request, res: express.Response): void {
        console.log('DELETE');
        try {
            var _id: string = req.params._id;
            var stakeholderTypeBusiness = new StakeholderTypeBusiness();
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
        try {
            let stakeholderTypeBusiness = new StakeholderTypeBusiness();
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
            let stakeholderTypeBusiness = new StakeholderTypeBusiness();
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

    hint(req: express.Request, res: express.Response): void {
        try {
            let stakeholderTypeBusiness = new StakeholderTypeBusiness();
            let optionsInstance = new Options();
            let _keyword: string = req.params._keyword || '';
            let _filter = (_keyword) ? { 'stakeholderTypeName': _keyword } : {};
            let _options = optionsInstance.initOptions({
                body: {
                    filter: _filter,
                    fields: [
                        'stakeholderTypeId',
                        'stakeholderTypeName'
                    ],
                    sort: { 'stakeholderTypeName': 1 }
                },
                query: {
                    limit: 0
                }
            });

            stakeholderTypeBusiness.query((error, result) => {
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
            var stakeholderTypeBusiness = new StakeholderTypeBusiness();
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
