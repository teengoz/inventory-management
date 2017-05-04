import IStock = require('./interfaces/IStock');

class Stock {
    private _stock: IStock;

    constructor(stock: IStock) {
        this._stock = stock;
    }

    get stockId(): string {
        return this._stock.stockId;
    }

    get stockName(): string {
        return this._stock.stockName;
    }

    get stockCode(): string {
        return this._stock.stockCode;
    }

    get stockDescription(): string {
        return this._stock.stockDescription;
    }

    get stockAddress(): string {
        return this._stock.stockAddress;
    }

    get isActive(): boolean {
        return this._stock.isActive;
    }

    get createdBy(): string {
        return this._stock.createdBy;
    }

    get updatedBy(): string {
        return this._stock.updatedBy;
    }

    get createdAt(): Date {
        return this._stock.createdAt;
    }

    get updatedAt(): Date {
        return this._stock.updatedAt;
    }


}

Object.seal(Stock);
export = Stock;
