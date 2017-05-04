import ITransaction = require('./interfaces/ITransaction');

class Transaction {
    private _transaction: ITransaction;

    constructor(transaction: ITransaction) {
        this._transaction = transaction;
    }

    get transactionId(): string {
        return this._transaction.transactionId;
    }

    get stakeholder(): any {
        return this._transaction.stakeholder;
    }

    get transactionType(): string {
        return this._transaction.transactionType;
    }

    get transactionNo(): string {
        return this._transaction.transactionNo;
    }

    get transactionDescription(): string {
        return this._transaction.transactionDescription;
    }

    get transactionTime(): Date {
        return this._transaction.transactionTime;
    }

    get isRecorded(): boolean {
        return this._transaction.isRecorded;
    }

    get createdBy(): any {
        return this._transaction.createdBy;
    }

    get updatedBy(): any {
        return this._transaction.updatedBy;
    }

    get createdAt(): Date {
        return this._transaction.createdAt;
    }

    get updatedAt(): Date {
        return this._transaction.updatedAt;
    }


}

Object.seal(Transaction);
export = Transaction;
