import IInventoryItemUnit = require('./interfaces/IInventoryItemUnit');

class InventoryItemUnit {
    private _inventoryitemunit: IInventoryItemUnit;

    constructor(inventoryitemunit: IInventoryItemUnit) {
        this._inventoryitemunit = inventoryitemunit;
    }

    get inventoryItemUnitID(): string {
        return this._inventoryitemunit.inventoryItemUnitId;
    }

    get inventoryItemUnitAlias(): string {
        return this._inventoryitemunit.inventoryItemUnitSymbol;
    }

    get inventoryItemUnitName(): string {
        return this._inventoryitemunit.inventoryItemUnitName;
    }

    get inventoryItemUnitDescription(): string {
        return this._inventoryitemunit.inventoryItemUnitDescription;
    }

    get createBy(): string {
        return this._inventoryitemunit.createBy;
    }

    get updatedBy(): string {
        return this._inventoryitemunit.updatedBy;
    }

    get createdBy(): Date {
        return this._inventoryitemunit.createdBy;
    }

    get updatedAt(): Date {
        return this._inventoryitemunit.updatedAt;
    }


}

Object.seal(InventoryItemUnit);
export = InventoryItemUnit;
