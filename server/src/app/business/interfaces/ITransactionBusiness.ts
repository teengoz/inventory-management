import BaseBusiness = require("./../BaseBusiness");
import ITransaction = require("./../../model/interfaces/ITransaction");

interface ITransactionBusiness extends BaseBusiness<ITransaction> {

}
export = ITransactionBusiness;
