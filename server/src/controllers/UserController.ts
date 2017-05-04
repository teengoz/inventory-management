import express = require("express");
import passport = require('passport');

import IBaseController = require("./BaseController");
import UserBusiness = require("./../app/business/UserBusiness");
import IUser = require("./../app/model/interfaces/IUser");
import User = require('./../app/model/User');
import JsonResponse = require("../app/model/JsonResponse");

class UserController implements IBaseController<UserBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            var user: IUser = <IUser>req.body;
            var userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    authenticate(req: express.Request, res: express.Response, next): void {
        if (!req.body.username || !req.body.password) {
            let errors = [];
            if (!req.body.username) errors.push('Username is required');
            if (!req.body.password) errors.push('Password is required');
            let jsonObj = new JsonResponse(false, null, '', errors);
            res.status(400).json(jsonObj.return());
            console.log('abc4');
            return;
        }

        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }

            if (user) {
                let _user: IUser = <IUser>user;
                let currentUser = new User(_user);
                res.json({ token: currentUser.generateJwt() });
                return;
            } else {
                res.status(401).json(info);
                return;
            }
        })(req, res, next);
    }

    debugCreate(req: express.Request, res: express.Response): void {
        try {
            var user: IUser = <IUser>{
                username: 'Micheal Lemon',
                password: '123'
            };
            var userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var user: IUser = <IUser>req.body;
            var _id: string = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.update(_id, user, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.delete(_id, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {

            var userBusiness = new UserBusiness();
            userBusiness.retrieve((error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.findById(_id, (error, result) => {
                if (error) res.send({ "error": "error" });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
}
export = UserController;
