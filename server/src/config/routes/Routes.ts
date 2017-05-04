import express = require('express');
//import passport = require('passport');
import path = require('path');
import jwt = require('express-jwt');

import HeroRoutes = require('../routes/HeroRoutes');
import LemonRoutes = require('../routes/LemonRoutes');
import UserRoutes = require('../routes/UserRoutes');
import AuthRoutes = require('../routes/AuthRoutes');
import StockRoutes = require('../routes/StockRoutes');
import InventoryItemUnitRoutes = require('../routes/InventoryItemUnitRoutes');
import StakeholderTypeRoutes = require('../routes/StakeholderTypeRoutes');
import StakeholderRoutes = require('../routes/StakeholderRoutes');
import InventoryItemCategoryRoutes = require('../routes/InventoryItemCategoryRoutes');
import SystemConfigRoutes = require('../routes/SystemConfigRoutes');
import InventoryItemRoutes = require('../routes/InventoryItemRoutes');
import InventoryItemDiscountRoutes = require('../routes/InventoryItemDiscountRoutes');
import TransactionRoutes = require('../routes/TransactionRoutes');

var app = express();
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

class Routes {

    get routes() {

        app.use("/auth", new AuthRoutes().routes);
        app.use("/heroes", auth, new HeroRoutes().routes);
        app.use("/stocks", auth, new StockRoutes().routes);
        app.use("/units", auth, new InventoryItemUnitRoutes().routes);
        app.use("/stakeholder-types", auth, new StakeholderTypeRoutes().routes);
        app.use("/stakeholders", auth, new StakeholderRoutes().routes);
        app.use("/item-categories", auth, new InventoryItemCategoryRoutes().routes);
        app.use("/config", auth, new SystemConfigRoutes().routes);
        app.use("/items", auth, new InventoryItemRoutes().routes);
        app.use("/item-discounts", auth, new InventoryItemDiscountRoutes().routes);
        app.use("/transactions", auth, new TransactionRoutes().routes);
        app.use("/", new LemonRoutes().routes);
        app.use("/", new UserRoutes().routes);

        return app;
    }
}
export = Routes;
