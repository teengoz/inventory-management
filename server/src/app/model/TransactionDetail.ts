import ITransactionDetail = require('./interfaces/ITransactionDetail');

class TransactionDetail {
    private _transactiondetail: ITransactionDetail;

    constructor(transactiondetail: ITransactionDetail) {
        this._transactiondetail = transactiondetail;
    }

    get transactionDetailId(): string {
        return this._transactiondetail.transactionDetailId;
    }

    get transaction(): any {
        return this._transactiondetail.transaction;
    }

    get inventoryItem(): any {
        return this._transactiondetail.inventoryItem;
    }

    get stock(): any {
        return this._transactiondetail.stock;
    }

    get sencondStock(): any {
        return this._transactiondetail.sencondStock;
    }

    get unit(): string {
        return this._transactiondetail.unit;
    }

    get quantity(): number {
        return this._transactiondetail.quantity;
    }

    get price(): number {
        return this._transactiondetail.price;
    }

    get baseUnit(): string {
        return this._transactiondetail.baseUnit;
    }

    get conversionRate(): number {
        return this._transactiondetail.conversionRate;
    }

    get conversionOperator(): string {
        return this._transactiondetail.conversionOperator;
    }

    get realQuantity(): number {
        return this._transactiondetail.realQuantity;
    }

    get createdBy(): any {
        return this._transactiondetail.createdBy;
    }

    get updatedBy(): any {
        return this._transactiondetail.updatedBy;
    }

    get createdAt(): Date {
        return this._transactiondetail.createdAt;
    }

    get updatedAt(): Date {
        return this._transactiondetail.updatedAt;
    }


}

Object.seal(TransactionDetail);
export = TransactionDetail;
