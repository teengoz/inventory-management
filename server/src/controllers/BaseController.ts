import IReadController = require("./interfaces/ReadController");
import IWriteController = require("./interfaces/WriteController");
import IBaseBusiness = require("../app/business/BaseBusiness");
import JsonResponse = require("../app/model/JsonResponse");

interface BaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController {


}
export = BaseController;
