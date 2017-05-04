import IInventoryItemCategory = require('./interfaces/IInventoryItemCategory');

class InventoryItemCategory {
    private _inventoryitemcategory: IInventoryItemCategory;

    constructor(inventoryitemcategory: IInventoryItemCategory) {
        this._inventoryitemcategory = inventoryitemcategory;
    }

    get inventoryItemCategoryId(): string {
        return this._inventoryitemcategory.inventoryItemCategoryId;
    }

    get inventoryItemCategoryName(): string {
        return this._inventoryitemcategory.inventoryItemCategoryName;
    }

    get inventoryItemCategoryCode(): string {
        return this._inventoryitemcategory.inventoryItemCategoryCode;
    }

    get inventoryItemCategoryDescription(): string {
        return this._inventoryitemcategory.inventoryItemCategoryDescription;
    }

    get parentID(): any {
        return this._inventoryitemcategory.parent;
    }

    get isActive(): boolean {
        return this._inventoryitemcategory.isActive;
    }

    get createdBy(): string {
        return this._inventoryitemcategory.createdBy;
    }

    get updatedBy(): string {
        return this._inventoryitemcategory.updatedBy;
    }

    get createdAt(): Date {
        return this._inventoryitemcategory.createdAt;
    }

    get updatedAt(): Date {
        return this._inventoryitemcategory.updatedAt;
    }


}

Object.seal(InventoryItemCategory);
export = InventoryItemCategory;
