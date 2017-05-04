const transformFields = {
    stock: [
        { 'stockId': 'stock_id' },
        { 'stockName': 'stock_name' },
        { 'stockCode': 'stock_code' },
        { 'stockDescription': 'stock_description' },
        { 'stockAddress': 'stock_address' },
        { 'isActive': 'is_active' },
        { 'createdAt': 'created_at' },
        { 'updatedAt': 'updated_at' },
    ],

    inventoryItemUnit: [
        { 'inventoryItemUnitId' : 'inventory_item_unit_id' },
        { 'inventoryItemUnitName' : 'inventory_item_unit_name' },
        { 'inventoryItemUnitSymbol' : 'inventory_item_unit_symbol' },
        { 'inventoryItemUnitDescription' : 'inventory_item_unit_description' },
        { 'createBy' : 'create_by' },
        { 'updatedBy' : 'updated_by' },
        { 'createdBy' : 'created_by' },
        { 'updatedAt' : 'updated_at' },
    ],

    toSnakeCase: (source) => {
        return source.replace(/\.?([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
    },

    toCamelCase: (source) => {
        return source.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
    }
}

export { transformFields };
