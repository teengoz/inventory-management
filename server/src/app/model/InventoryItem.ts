import IInventoryItem = require('./interfaces/IInventoryItem');

class InventoryItem {
    private _inventoryItem: IInventoryItem;

    constructor(inventoryitem: any = {}) {
        this._inventoryItem = inventoryitem;
        if (!this._inventoryItem.inventoryItemCode) {
            let newId = new Date().getTime().toString();
            this._inventoryItem.inventoryItemCode = newId;
        }
    }

    get inventoryItemId(): string {
        return this._inventoryItem.inventoryItemId;
    }

    get inventoryItemCategory(): any {
        return this._inventoryItem.inventoryItemCategory;
    }

    get inventoryItemName(): string {
        return this._inventoryItem.inventoryItemName;
    }

    get inventoryItemCode(): string {
        return this._inventoryItem.inventoryItemCode;
    }

    get inventoryItemDescription(): string {
        return this._inventoryItem.inventoryItemDescription;
    }

    get inventoryItemMinQuantity(): number {
        return this._inventoryItem.inventoryItemMinQuantity;
    }

    get inventoryItemMaxQuantity(): number {
        return this._inventoryItem.inventoryItemMaxQuantity;
    }

    get inventoryItemCostPrice(): number {
        return this._inventoryItem.inventoryItemCostPrice;
    }

    get inventoryItemBaseUnit(): string {
        return this._inventoryItem.inventoryItemBaseUnit;
    }

    get inventoryItemConversionUnit(): any {
        return this._inventoryItem.inventoryItemConversionUnit;
    }

    get inventoryItemSpecification1(): string {
        return this._inventoryItem.inventoryItemSpecification1;
    }

    get inventoryItemSpecification2(): string {
        return this._inventoryItem.inventoryItemSpecification2;
    }

    get inventoryItemSpecification3(): string {
        return this._inventoryItem.inventoryItemSpecification3;
    }

    get inventoryItemSpecification4(): string {
        return this._inventoryItem.inventoryItemSpecification4;
    }

    get inventoryItemSpecification5(): string {
        return this._inventoryItem.inventoryItemSpecification5;
    }

    get isActive(): boolean {
        return this._inventoryItem.isActive;
    }

    get createdBy(): any {
        return this._inventoryItem.createdBy;
    }

    get updatedBy(): any {
        return this._inventoryItem.updatedBy;
    }

    get createdAt(): Date {
        return this._inventoryItem.createdAt;
    }

    get updatedAt(): Date {
        return this._inventoryItem.updatedAt;
    }


}

Object.seal(InventoryItem);
export = InventoryItem;