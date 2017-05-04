import express = require("express");
import LemonBusiness = require("./../app/business/LemonBusiness");
import IBaseController = require("./BaseController");
import ILemon = require("./../app/model/interfaces/ILemon");

class LemonController implements IBaseController <LemonBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            var lemon: ILemon = <ILemon>req.body;
            var lemonBusiness = new LemonBusiness();
            lemonBusiness.create(lemon, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    debugCreate(req: express.Request, res: express.Response): void {
        try {
            var lemon: ILemon = <ILemon>{
                name: 'Micheal Lemon',
                level: 2,
                color: 'RED',
                source: 'US'
            };
            var lemonBusiness = new LemonBusiness();
            lemonBusiness.create(lemon, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var lemon: ILemon = <ILemon>req.body;
            var _id: string = req.params._id;
            var lemonBusiness = new LemonBusiness();
            lemonBusiness.update(_id, lemon, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var lemonBusiness = new LemonBusiness();
            lemonBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {

            var lemonBusiness = new LemonBusiness();
            lemonBusiness.retrieve((error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var lemonBusiness = new LemonBusiness();
            lemonBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
}
export = LemonController;