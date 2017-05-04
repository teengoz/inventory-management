import TransactionDetail = require("../model/TransactionDetail");
import ITransactionDetail = require("../model/interfaces/ITransactionDetail");
import TransactionDetailSchema = require("../dataAccess/schemas/TransactionDetailSchema");
import RepositoryBase = require("./BaseRepository");

class TransactionDetailRepository extends RepositoryBase<ITransactionDetail> {
    constructor() {
        super(TransactionDetailSchema);
    }
}

Object.seal(TransactionDetailRepository);
export = TransactionDetailRepository;
