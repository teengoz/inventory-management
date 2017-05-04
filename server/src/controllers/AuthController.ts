import express = require("express");
import passport = require('passport');

import IBaseController = require("./BaseController");
import UserBusiness = require("./../app/business/UserBusiness");
import IUser = require("./../app/model/interfaces/IUser");
import User = require('./../app/model/User');
import JsonResponse = require("../app/model/JsonResponse");

class AuthController {
    authenticate(req: express.Request, res: express.Response, next): void {
        if (!req.body.username || !req.body.password) {
            let errors = [];
            if (!req.body.username) errors.push('Username is required');
            if (!req.body.password) errors.push('Password is required');
            let jsonObj = new JsonResponse(false, '', null, errors);
            res.status(400).json(jsonObj.return());
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

    checkAuth(req: express.Request, res: express.Response, next): void {
        res.status(200).json({ success: true });
    }

    getAuthenticatedUser(req: express.Request, res: express.Response, next): void {
        var userBusiness = new UserBusiness();
        userBusiness.findById(req['payload']['_id'], (error, result) => {
            res.status(200).json({ 'result': result, 'payload': req['payload'] });
        });
    }
}
export = AuthController;
