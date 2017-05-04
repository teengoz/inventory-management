import express = require("express");
import passport = require('passport');
import UserController = require("./../../controllers/UserController");
import IUser = require('../../app/model/interfaces/IUser');
import User = require('../../app/model/User');

//////////////////////////////////////////////
//Debug code for Add New and Authenticate User
import UserBusiness = require('../../app/business/UserBusiness');

var router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor() {
        this._userController = new UserController();
    }
    get routes() {
        var controller = this._userController;

        router.get("/users", controller.retrieve);
        router.post("/users", controller.create);
        //router.get("/newuser", controller.debugCreate);
        router.put("/users/:_id", controller.update);
        router.get("/users/:_id", controller.findById);
        router.delete("/users/:_id", controller.delete);

        //////////////////////////////////////////////
        //Debug code for Add New and Authenticate User
        router.post("/users/register", function(req, res, next) {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({ message: 'Please fill out all fields' });
            }

            var _user: IUser = <IUser>{
                username: '',
                hash: '',
                salt: ''
            };
            var user = new User(_user);

            user.username = req.body.username;

            user.setPassword(req.body.password)

            try {
                let _user = <IUser>{
                    username: user.username,
                    hash: user.hash,
                    salt: user.salt
                };
                var userBusiness = new UserBusiness();
                userBusiness.create(_user, (error, result) => {
                    if (error) res.send({ "error": "error" });
                    else res.json({ token: user.generateJwt() });
                });
            }
            catch (e) {
                console.log(e);
                res.send({ "error": "error in your request" });

            }
        });
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;
