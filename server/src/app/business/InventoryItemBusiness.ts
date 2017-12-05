import InventoryItemRepository = require("../repository/InventoryItemRepository");
import TransactionDetailRepository = require("../repository/TransactionDetailRepository")
import IInventoryItemBusiness = require("./interfaces/IInventoryItemBusiness");
import TransactionDetailBusiness = require("./TransactionDetailBusiness");
import IInventoryItem = require("../model/interfaces/IInventoryItem");
import InventoryItem = require("../model/InventoryItem");


class InventoryItemBusiness implements IInventoryItemBusiness {
    private _inventoryitemRepository: InventoryItemRepository;
    private _transactionDetailRepository: TransactionDetailRepository;

    constructor() {
        this._inventoryitemRepository = new InventoryItemRepository();
        this._transactionDetailRepository = new TransactionDetailRepository();
    }

    create(req, callback: (error: any, result: any) => void) {
        let body = req.body;
        let item = <IInventoryItem>req.body['basic'];

        if (!item['inventoryItemName'] || !item['inventoryItemCostPrice'] || !item['inventoryItemBaseUnit']) {
            callback('error', null);
            return;
        }

        let userId = req['payload']['_id'];
        item['createdBy'] = userId;

        let inventoryItemCategoryId = body['basic']['inventoryItemCategory.inventoryItemCategoryId'];
        item['inventoryItemCategory'] = inventoryItemCategoryId;

        let inventoryItemConversionUnit = body['unitConversion'];
        item['inventoryItemConversionUnit'] = JSON.stringify(inventoryItemConversionUnit);

        let specification = body['specification'];
        for (let i = 0; i < 5; i++) {
            let spec = specification[i];
            if (spec) {
                item['inventoryItemSpecification' + (i + 1)] = spec;
            }
        }

        if (!body['inventoryItemCode']) {
            let newId = new Date().getTime().toString();
            item['inventoryItemCode'] = newId;
        } else {
            this.findCode(body['inventoryItemCode'], (error, result) => {
                console.log('**********************************');
                console.log(result);
            });
        }

        this._inventoryitemRepository.create(item, callback);
    }

    update(_id: string, item, callback: (error: any, result: any) => void) {

    };

    updateItem(req, callback: (error: any, result: any) => void) {
        var _id: string = req.params._id;

        this._inventoryitemRepository.findById(_id, (error, result) => {
            if (error)
                callback(error, result);
            else {
                let body = req.body;
                let currentItem = result;
                let item = <IInventoryItem>body['basic'];

                if (!item['inventoryItemCode']) {
                    delete item['inventoryItemCode'];
                }
                item['inventoryItemCode'] = currentItem['inventoryItemCode'];

                if (!item['inventoryItemName'] || !item['inventoryItemCostPrice'] || !item['inventoryItemBaseUnit']) {
                    callback('error', null);
                    return;
                }

                let userId = req['payload']['_id'];
                item['createdBy'] = userId;

                let inventoryItemCategoryId = body['basic']['inventoryItemCategory.inventoryItemCategoryId'];
                item['inventoryItemCategory'] = inventoryItemCategoryId;
                delete item['inventoryItemCategory.inventoryItemCategoryId'];

                let inventoryItemConversionUnit = body['unitConversion'];
                item['inventoryItemConversionUnit'] = JSON.stringify(inventoryItemConversionUnit);

                let specification = body['specification'];
                for (let i = 0; i < 5; i++) {
                    let spec = specification[i];
                    if (spec) {
                        item['inventoryItemSpecification' + (i + 1)] = spec;
                    } else {
                        item['inventoryItemSpecification' + (i + 1)] = null;
                    }
                }

                this._inventoryitemRepository.update(currentItem._id, item, callback);
            }

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._inventoryitemRepository.delete(_id, callback);
    }

    retrieve(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryitemRepository.retrieve(callback, _options);
    }

    query(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryitemRepository.find(callback, _options);
    }

    findById(_id: string, callback: (error: any, result: IInventoryItem) => void) {
        this._inventoryitemRepository.findById(_id, callback);
    }

    getQuantity(_id: string, callback: (error: any, result: any) => void) {
        this._transactionDetailRepository.getQuantity(_id, (error, result) => {
            callback(null, result);
        });
    }

    /**
     * Search inventoryItems by itemCode or itemName
     */
    search(_keyword: string, callback: (error: any, result: any) => void) {
        console.log('SEARCH--------');
        if (!!_keyword) {
            let _options = {};
            _options['cond'] = {};
            _options['cond']['filter'] = {
                $or: [
                    { 'inventoryItemCode': new RegExp(_keyword, 'i') },
                    { 'inventoryItemName': new RegExp(_keyword, 'i') }
                ]
            };
            _options['cond']['type'] = 'search';
            _options['fields'] = [
                '_id',
                'inventoryItemId',
                'inventoryItemCode',
                'inventoryItemName',
                'inventoryItemConversionUnit',
                'inventoryItemBaseUnit'
            ];

            this._inventoryitemRepository.find((error, result) => {
                let inventoryItems = result;
                //let inventoryItemId = inventoryItems[0]['inventoryItemId'];
                let transactionDetailBusiness: TransactionDetailBusiness = new TransactionDetailBusiness();
                let computedInventoryItems = [];
                this.computeQuantity(this, inventoryItems, computedInventoryItems, (result) => {
                    callback(null, result);
                })

            }, _options);
        } else {
            this._inventoryitemRepository.retrieve(callback, {});
        }
    }

    computeQuantity(base: any, orginalInventoryItems: any[], computedInventoryItems: any[], nextCallback) {
        if (orginalInventoryItems.length > 0) {
            let currentInventoryItem = orginalInventoryItems.pop();
            let inventoryItemId = currentInventoryItem['inventoryItemId'];

            let transactionDetailBusiness: TransactionDetailBusiness = new TransactionDetailBusiness();
            transactionDetailBusiness.findByInventoryItemId(inventoryItemId, (error, result) => {
                let instock = 0;
                for (let i = 0; i < result.length; i++) {
                    let realQuantity = +result[i]['realQuantity'];
                    switch (+result[i]['transactionType']) {
                        case 1:
                            realQuantity *= 1;
                            break;
                        case 2:
                            realQuantity *= -1;
                            break;
                        case 3:
                            realQuantity *= 0;
                            break;
                        default:
                            realQuantity *= 0;
                    }
                    instock += realQuantity;
                }
                currentInventoryItem['instock'] = instock;
                computedInventoryItems.push(currentInventoryItem);
                base.computeQuantity(base, orginalInventoryItems, computedInventoryItems, nextCallback);
            })
        } else {
            console.log(computedInventoryItems)
            nextCallback(computedInventoryItems);
        }
    }

    findCode(_code: string, callback: (error: any, result: any) => void) {
        let _options = {};
        _options['cond'] = {};
        _options['cond']['filter'] = { 'inventoryItemCode': _code };
        _options['cond']['type'] = '=';

        this._inventoryitemRepository.find(callback, _options);
    }

    meta(callback: (error: any, result: any) => void, options?: any) {
        let _options = options || {};

        this._inventoryitemRepository.meta(callback, _options);
    }
}


Object.seal(InventoryItemBusiness);
export = InventoryItemBusiness;
