import Transaction = require("../model/Transaction");
import ITransaction = require("../model/interfaces/ITransaction");
import TransactionSchema = require("../dataAccess/schemas/TransactionSchema");
import RepositoryBase = require("./BaseRepository");

class TransactionRepository extends RepositoryBase<ITransaction> {
    constructor() {
        super(TransactionSchema);
    }
}

Object.seal(TransactionRepository);
export = TransactionRepository;
