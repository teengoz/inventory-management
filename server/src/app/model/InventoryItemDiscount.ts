import IInventoryItemDiscount = require('./interfaces/IInventoryItemDiscount');

class InventoryItemDiscount {
    private _inventoryitemdiscount: IInventoryItemDiscount;

    constructor(inventoryitemdiscount: IInventoryItemDiscount) {
        this._inventoryitemdiscount = inventoryitemdiscount;
    }

    get inventoryItemDiscountId(): string {
        return this._inventoryitemdiscount.inventoryItemDiscountId;
    }

    get inventoryItem(): any {
        return this._inventoryitemdiscount.inventoryItem;
    }

    get inventoryItemDiscountMinQuantity(): number {
        return this._inventoryitemdiscount.inventoryItemDiscountMinQuantity;
    }

    get inventoryItemDiscountMaxQuantity(): number {
        return this._inventoryitemdiscount.inventoryItemDiscountMaxQuantity;
    }

    get inventoryItemDiscountValue(): number {
        return this._inventoryitemdiscount.inventoryItemDiscountValue;
    }

    get inventoryItemDiscountType(): number {
        return this._inventoryitemdiscount.inventoryItemDiscountType;
    }

    get isActive(): boolean {
        return this._inventoryitemdiscount.isActive;
    }

    get createdBy(): any {
        return this._inventoryitemdiscount.createdBy;
    }

    get updatedBy(): any {
        return this._inventoryitemdiscount.updatedBy;
    }

    get createdAt(): Date {
        return this._inventoryitemdiscount.createdAt;
    }

    get updatedAt(): Date {
        return this._inventoryitemdiscount.updatedAt;
    }
}

Object.seal(InventoryItemDiscount);
export = InventoryItemDiscount;