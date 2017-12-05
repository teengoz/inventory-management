import Transaction = require("../model/Transaction");
import ITransaction = require("../model/interfaces/ITransaction");
import TransactionSchema = require("../dataAccess/schemas/TransactionSchema");
import RepositoryBase = require("./BaseRepository");
import mongoose = require("mongoose");

class TransactionRepository extends RepositoryBase<ITransaction> {
    constructor() {
        super(TransactionSchema);
    }

    update(_id: mongoose.Types.ObjectId, _item: ITransaction, callback: (error: any, result: any) => void) {
        mongoose.set('debug', true);
        this._model.findById(_id.toString(), (error, result) => {
            if (result.isRecorded && _item.isRecorded == undefined) {
                callback('Recorded', null);
            } else {
                this._model.update({ _id: _id }, _item, callback);
            }
        })
    }
}

Object.seal(TransactionRepository);
export = TransactionRepository;
