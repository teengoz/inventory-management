import BaseBusiness = require("./../BaseBusiness");
import IUser = require("./../../model/interfaces/IUser");

interface IUserBusiness extends BaseBusiness<IUser> {

}
export = IUserBusiness;