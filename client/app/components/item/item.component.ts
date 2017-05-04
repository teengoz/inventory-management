import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { routerTransition } from '../../app.animation';
import { InputControlService } from '../../services/input-control.service';
import { DynamicFormService } from '../../services/form.services';
import { ItemService } from '../../services/item.service';
import { ItemSupportingInformationComponent } from "../item-supporting-information/item-supporting-information.component";
import { ItemUnitConversionComponent } from '../item-unit-conversion/item-unit-conversion.component';
import { ItemSpecificationComponent } from '../item-specification/item-specification.component';
declare var jQuery: any;

@Component({
    selector: 'im-item',
    templateUrl: './app/components/item/item.component.html',
    styleUrls: ['./app/components/item/item.component.css'],
    providers: [DynamicFormService, ItemService],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class ItemComponent implements OnInit, OnDestroy {
    //Main variables
    private sub: any;
    pageName = 'Thêm hàng hóa';
    form: FormGroup;
    loaded = false;
    isEditPage = false;
    data;

    //Basic Information

    //Unit Conversion
    @ViewChild('itemUniConversionData') itemUniConversionData: ItemUnitConversionComponent;

    //Specification
    @ViewChild('itemSpecificationData') itemSpecificationData: ItemSpecificationComponent;


    configs;
    inputs = [];

    constructor(
        private activedRoute: ActivatedRoute,
        private router: Router,
        private ics: InputControlService,
        private dfs: DynamicFormService,
        private service: ItemService,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    turnPage(page) {

    }

    ngOnInit() {     
        this.sub = this.activedRoute.params.subscribe(params => {
            let _code = params['_code'];
            if (_code) {
                this.service.findCode(_code)
                    .then(
                    result => {
                        if (result.success && result.data) {
                            let _data = result.data[0];
                            let _unitConversion = (_data['inventoryItemConversionUnit']) ? JSON.parse(_data['inventoryItemConversionUnit']) : [];
                            let _specification = [];
                            for (let i = 0; i < 5; i++) {
                                if (_data['inventoryItemSpecification' + (i + 1)]) {
                                    _specification[i] = {
                                        'name': _data['inventoryItemSpecification' + (i + 1)],
                                        'active': true
                                    }
                                } else {
                                    _specification[i] = {
                                        name: 'Thuộc tính' + (i + 1),
                                        active: false
                                    }
                                }
                            }
                            this.data = _data;
                            this.inputs = this.dfs.getInputs('itemBasicInfoEdit');
                            this.form = this.ics.toFormGroup(this.inputs);
                            this.itemUniConversionData.childData.initialData = _unitConversion;
                            this.itemSpecificationData.data = _specification;
                            this.isEditPage = true;
                            this.pageName = "Chỉnh sửa thông tin hàng hóa";
                            this.loaded = true;
                        }
                    },
                    error => console.log(error)
                    )
            } else {
                this.inputs = this.dfs.getInputs('itemBasicInfoBlank');
                this.form = this.ics.toFormGroup(this.inputs);
                this.loaded = true;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngAfterViewInit() {
        //console.log(jQuery('body').html());
    }

    submitForm(event) {
        this.onSubmit(this.form, event, (success) => {
            if (success) {
                let actionId = event.target.id;
                if (actionId && actionId == 'save-back') {
                    setTimeout(() => {
                        this.router.navigate(['management', 'items']);
                    }, 700)
                }
            }
        });
    }

    onSubmit(empForm: any, event: Event, callback) {
        event.preventDefault();
        let basicInfo = this.form.value;
        let unitConversionData = this.itemUniConversionData.getChildData();
        let specificationData = this.itemSpecificationData.getData();

        let _data = {
            'basic': basicInfo,
            'unitConversion': unitConversionData,
            'specification': specificationData
        }

        this.service.save(_data).then(
            result => {
                if (result['success']) {
                    let dialog = this.modal.alert()
                        .size('sm')
                        .showClose(true)
                        .title('Thông báo')
                        .body(`Đã lưu thành công`)
                        .open();

                    dialog.then(dialogResult => {
                        dialogResult.result.then(
                            () => {
                                this.resetInputData();
                                callback(true);
                            },
                            () => {
                                this.resetInputData();
                                callback(true);
                            }
                        )
                    })
                } else {
                    let dialog = this.modal.alert()
                        .size('sm')
                        .showClose(true)
                        .title('Lỗi')
                        .body(`Vui lòng kiểm tra lại các thông tin đã nhập`)
                        .open()
                    dialog.then(dialogResult => {
                        dialogResult.result.then(
                            () => {
                                callback(false);
                            },
                            () => {
                                callback(false);
                            }
                        )
                    })
                }
            },
            error => {
                console.log(error);
                callback(false);
            }
        );
    }

    private resetInputData() {
        this.form.reset();
        this.itemUniConversionData.resetInputData();
        this.itemSpecificationData.resetInputData();
    }

    back() {
        console.log(this.activedRoute.parent);
    }

    _log(m) {
        console.log(m);
    }
}