import { InputBase } from '../models/input/input-base';
import { TextboxInput } from '../models/input/input-textbox';
import { DropdownInput } from '../models/input/input-dropdown';
import { AutoTextboxInput } from '../models/input/input-auto-textbox';

import { StockService } from '../services/stock.service';
import { StakeholderTypeService } from '../services/stakeholder-type.service';
import { StakeholderService } from '../services/stakeholder.service';
import { ItemCategoryService } from '../services/item-category.service';
//import { ItemDiscountService } from '../services/item-discount.service';

const FORMS = {
    'stockAdd': {
        title: 'Thêm kho',
        submit: 'save',
        service: StockService,
        inputs: [
            new TextboxInput({
                key: 'stockCode',
                label: 'Mã kho',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'stockName',
                label: 'Tên kho',
                type: 'text',
                required: true,
                order: 2
            }),
            new TextboxInput({
                key: 'stockAddress',
                label: 'Địa chỉ',
                type: 'text',
                order: 3
            })
        ].sort((a, b) => a.order - b.order)
    },
    'stockEdit': {
        title: 'Cập nhật kho',
        submit: 'save',
        service: StockService,
        inputs: [
            new TextboxInput({
                key: 'stockCode',
                label: 'Mã kho',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'stockName',
                label: 'Tên kho',
                type: 'text',
                required: true,
                order: 2
            }),
            new TextboxInput({
                key: 'stockAddress',
                label: 'Địa chỉ',
                type: 'text',
                order: 3
            }),
            new TextboxInput({
                key: 'stockId',
                type: 'hidden',
                order: 4
            }),
        ].sort((a, b) => a.order - b.order)
    },
    'stakeholderTypeAdd': {
        title: 'Thêm nhóm đối tác',
        submit: 'save',
        service: StakeholderTypeService,
        inputs: [
            new TextboxInput({
                key: 'stakeholderTypeCode',
                label: 'Mã nhóm ĐT',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'stakeholderTypeName',
                label: 'Tên nhóm ĐT',
                type: 'text',
                required: true,
                order: 2
            }),
            new TextboxInput({
                key: 'stakeholderTypeDescription',
                label: 'Mô tả',
                type: 'text',
                order: 3
            })
        ].sort((a, b) => a.order - b.order)
    },
    'stakeholderTypeEdit': {
        title: 'Cập nhật thông tin nhóm đối tác',
        submit: 'save',
        service: StakeholderTypeService,
        inputs: [
            new TextboxInput({
                key: 'stakeholderTypeCode',
                label: 'Mã nhóm ĐT',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'stakeholderTypeName',
                label: 'Tên nhóm ĐT',
                type: 'text',
                required: true,
                order: 2
            }),
            new TextboxInput({
                key: 'stakeholderTypeDescription',
                label: 'Mô tả',
                type: 'text',
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderTypeId',
                type: 'hidden',
                order: 4
            })
        ].sort((a, b) => a.order - b.order)
    },
    'stakeholderAdd': {
        title: 'Thêm đối tác',
        submit: 'save',
        service: StakeholderService,
        inputs: [
            new TextboxInput({
                key: 'stakeholderCode',
                label: 'Mã ĐT',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'stakeholderName',
                label: 'Tên ĐT',
                type: 'text',
                required: true,
                order: 2
            }),
            new DropdownInput({
                key: 'stakeholderType.stakeholderTypeId',
                label: 'Nhóm ĐT',
                hintService: StakeholderTypeService,
                keyField: 'stakeholderTypeId',
                valueField: 'stakeholderTypeName',
                inputWidth: 6,
                required: true,
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderPhone1',
                label: 'Số điện thoại',
                type: 'text',
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderEmail',
                label: 'Email',
                type: 'text',
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderAddress',
                label: 'Địa chỉ',
                type: 'text',
                order: 3
            })
        ].sort((a, b) => a.order - b.order)
    },
    'stakeholderEdit': {
        title: 'Cập nhật thông tin đối tác',
        submit: 'save',
        service: StakeholderService,
        inputs: [
            new TextboxInput({
                key: 'stakeholderCode',
                label: 'Mã ĐT',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'stakeholderName',
                label: 'Tên ĐT',
                type: 'text',
                required: true,
                order: 2
            }),
            new DropdownInput({
                key: 'stakeholderType.stakeholderTypeId',
                label: 'Nhóm ĐT',
                hintService: StakeholderTypeService,
                keyField: 'stakeholderTypeId',
                valueField: 'stakeholderTypeName',
                inputWidth: 6,
                required: true,
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderPhone1',
                label: 'Số điện thoại',
                type: 'text',
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderEmail',
                label: 'Email',
                type: 'text',
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderAddress',
                label: 'Địa chỉ',
                type: 'text',
                order: 3
            }),
            new TextboxInput({
                key: 'stakeholderId',
                type: 'hidden',
                order: 4
            })
        ].sort((a, b) => a.order - b.order)
    },
    'itemCategoryAdd': {
        title: 'Thêm nhóm hàng hóa',
        submit: 'save',
        service: ItemCategoryService,
        inputs: [
            new TextboxInput({
                key: 'inventoryItemCategoryCode',
                label: 'Mã nhóm HH',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemCategoryName',
                label: 'Tên nhóm HH',
                type: 'text',
                required: true,
                order: 2
            }),
            new TextboxInput({
                key: 'inventoryItemCategoryDescription',
                label: 'Mô tả',
                type: 'text',
                order: 3
            }),
            new DropdownInput({
                key: 'parent.inventoryItemCategoryId',
                label: 'Nhóm cha',
                hintService: ItemCategoryService,
                keyField: 'inventoryItemCategoryId',
                valueField: 'inventoryItemCategoryName',
                inputWidth: 6,
                order: 4
            })
        ].sort((a, b) => a.order - b.order)
    },
    'itemCategoryEdit': {
        title: 'Cập nhật thông tin nhóm hàng hóa',
        submit: 'save',
        service: ItemCategoryService,
        inputs: [
            new TextboxInput({
                key: 'inventoryItemCategoryCode',
                label: 'Mã nhóm HH',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemCategoryName',
                label: 'Tên nhóm HH',
                type: 'text',
                required: true,
                order: 2
            }),
            new TextboxInput({
                key: 'inventoryItemCategoryDescription',
                label: 'Mô tả',
                type: 'text',
                order: 3
            }),
            new DropdownInput({
                key: 'parent.inventoryItemCategoryId',
                label: 'Nhóm cha',
                hintService: ItemCategoryService,
                keyField: 'inventoryItemCategoryId',
                valueField: 'inventoryItemCategoryName',
                inputWidth: 6,
                order: 4
            }),
            new TextboxInput({
                key: 'inventoryItemCategoryId',
                type: 'hidden',
                order: 5
            })
        ].sort((a, b) => a.order - b.order)
    },
    'itemBasicInfoBlank': {
        title: 'Thông tin cơ bản',
        submit: 'save',
        service: ItemCategoryService,
        inputs: [
            new AutoTextboxInput({
                key: 'inventoryItemCode',
                label: 'Mã hàng hóa',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemName',
                label: 'Tên hàng hóa',
                type: 'text',
                required: true,
                order: 2
            }),
            new DropdownInput({
                key: 'inventoryItemCategory.inventoryItemCategoryId',
                label: 'Nhóm hàng hóa',
                hintService: ItemCategoryService,
                keyField: 'inventoryItemCategoryId',
                valueField: 'inventoryItemCategoryName',
                required: true,
                order: 3
            }),
            new TextboxInput({
                key: 'inventoryItemBaseUnit',
                label: 'ĐVT cơ sở',
                type: 'text',
                required: true,
                order: 4
            }),
            // new TextboxInput({
            //     key: 'inventoryItemCostPrice',
            //     label: 'Giá nhập',
            //     type: 'text',
            //     required: true,
            //     order: 5
            // }),
            // new TextboxInput({
            //     key: 'inventoryItemMinQuantity',
            //     label: 'Tồn tối thiểu',
            //     type: 'text',
            //     required: true,
            //     order: 6
            // }),
            // new TextboxInput({
            //     key: 'inventoryItemMaxQuantity',
            //     label: 'Tồn tối đa',
            //     type: 'text',
            //     required: true,
            //     order: 7
            // }),
        ].sort((a, b) => a.order - b.order)
    },
    'itemBasicInfoEdit': {
        title: 'Thông tin cơ bản',
        submit: 'save',
        service: ItemCategoryService,
        inputs: [
            new TextboxInput({
                key: 'inventoryItemCode',
                label: 'Mã hàng hóa',
                required: true,
                disabled: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemName',
                label: 'Tên hàng hóa',
                type: 'text',
                required: true,
                order: 2
            }),
            new DropdownInput({
                key: 'inventoryItemCategory.inventoryItemCategoryId',
                label: 'Nhóm hàng hóa',
                hintService: ItemCategoryService,
                keyField: 'inventoryItemCategoryId',
                valueField: 'inventoryItemCategoryName',
                required: true,
                order: 3
            }),
            new TextboxInput({
                key: 'inventoryItemBaseUnit',
                label: 'ĐVT cơ sở',
                type: 'text',
                required: true,
                order: 4
            }),
            new TextboxInput({
                key: 'inventoryItemCostPrice',
                label: 'Giá nhập',
                type: 'text',
                required: true,
                order: 5
            }),
            new TextboxInput({
                key: 'inventoryItemMinQuantity',
                label: 'Tồn tối thiểu',
                type: 'text',
                required: true,
                order: 6
            }),
            new TextboxInput({
                key: 'inventoryItemMaxQuantity',
                label: 'Tồn tối đa',
                type: 'text',
                required: true,
                order: 7
            }),
            new TextboxInput({
                key: 'inventoryItemId',
                type: 'hidden',
                order: 8
            }),
        ].sort((a, b) => a.order - b.order)
    },
    'itemUnitConversionAdd': {
        title: 'Quy đổi đơn vị tính',
        inputs: [
            new TextboxInput({
                key: 'inventoryItemUnitConversionName',
                label: 'ĐVT quy đổi',
                type: 'text',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemUnitConversionRate',
                label: 'Tỷ lệ quy đổi',
                type: 'text',
                required: true,
                order: 2
            }),
            // new DropdownInput({
            //     key: 'inventoryItemUnitConversionOperator',
            //     label: 'Phép tính quy đổi',
            //     options: [
            //         {
            //             'inventoryItemUnitConversionOperator': '*',
            //             'label': 'Nhân'
            //         },
            //         {
            //             'inventoryItemUnitConversionOperator': '/',
            //             'label': 'Chia'
            //         }
            //     ],
            //     keyField: 'inventoryItemUnitConversionOperator',
            //     valueField: 'label',
            //     required: true,
            //     inputWidth: 6,
            //     order: 3
            // }),
        ].sort((a, b) => a.order - b.order)
    },
    'itemUnitConversionEdit': {
        title: 'Chỉnh sửa thông tin chiết khấu',
        inputs: [
            new TextboxInput({
                key: 'inventoryItemUnitConversionName',
                label: 'ĐVT quy đổi',
                type: 'text',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemUnitConversionRate',
                label: 'Tỷ lệ quy đổi',
                type: 'text',
                required: true,
                order: 2
            }),
            // new DropdownInput({
            //     key: 'inventoryItemUnitConversionOperator',
            //     label: 'Phép tính quy đổi',
            //     options: [
            //         {
            //             'key': '*',
            //             'label': 'Nhân'
            //         },
            //         {
            //             'key': '/',
            //             'label': 'Chia'
            //         }
            //     ],
            //     keyField: 'key',
            //     valueField: 'label',
            //     required: true,
            //     inputWidth: 6,
            //     order: 3
            // }),
        ].sort((a, b) => a.order - b.order)
    },
    'itemSpecificationAdd': {
        title: 'Thêm tùy chọn thuộc tính',
        inputs: [
            new TextboxInput({
                key: 'inventoryItemSpecificationName',
                label: 'Tên thuộctính',
                type: 'text',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemSpecificationData',
                label: 'Giá trị',
                type: 'text',
                required: true,
                order: 1
            })
        ].sort((a, b) => a.order - b.order)
    },
    'itemSpecificationEdit': {
        title: 'Chỉnh sửa thông tin chiết khấu',
        inputs: [
            new TextboxInput({
                key: 'inventoryItemSpecificationName',
                label: 'Tên thuộctính',
                type: 'text',
                required: true,
                order: 1
            }),
            new TextboxInput({
                key: 'inventoryItemSpecificationData',
                label: 'Giá trị',
                type: 'text',
                required: true,
                order: 2
            }),
            new TextboxInput({
                key: 'inventoryItemId',
                type: 'hidden',
                order: 3
            }),
            new TextboxInput({
                key: '_localId',
                type: 'hidden',
                order: 4
            })
        ].sort((a, b) => a.order - b.order)
    }
}

export { FORMS };
