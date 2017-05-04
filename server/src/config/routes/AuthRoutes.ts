import express = require("express");
import passport = require('passport');
import jwt = require('express-jwt');

import AuthController = require("../../controllers/AuthController");
import IUser = require('../../app/model/interfaces/IUser');
import User = require('../../app/model/User');

var router = express.Router();
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

class AuthRoutes {
    private _authController: AuthController;

    constructor() {
        this._authController = new AuthController();
    }

    get routes() {
        var controller = this._authController;

        router.get("/", auth, controller.getAuthenticatedUser);
        router.post("/", controller.authenticate);
        router.get("/check", auth, controller.checkAuth);

        return router;
    }
}

Object.seal(AuthRoutes);
export = AuthRoutes;
