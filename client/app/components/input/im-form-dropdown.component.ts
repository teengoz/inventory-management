import { Component, Input, Output, ViewChild, OnInit, AfterViewChecked, ElementRef, EventEmitter, DoCheck } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FormGroup } from '@angular/forms';

import { GenerateHeader } from '../../services/generate-header';

@Component({
    selector: 'im-form-dropdown',
    templateUrl: './app/components/input/im-form-dropdown.component.html',
    styleUrls: ['./app/components/input/im-form-dropdown.component.css'],
    host: { '(document:click)': 'onClick($event)' }
})

export class IMFormDropdownComponent implements OnInit, DoCheck, AfterViewChecked {
    @Input() options;
    @Input() queryService;

    @Input() value;
    @Input() label;
    @Input() valueField;
    @Input() labelField;
    @Input() placeholder;

    @Output() enterValueEvent = new EventEmitter<any>();
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() labelChange: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('dropdownContainer') private dropdownContainer: ElementRef;
    @ViewChild('dropdownInput') private dropdownInput: ElementRef;

    optionsArray = [];
    isHideOptions = true;
    isEditing = false;
    selected = null;
    isDisabled = false;
    currentIndex = -1;
    termInput = '';
    dropdownInputWidth = 200;

    constructor(
        private http: Http,
        private genHeader: GenerateHeader,
        private _eref: ElementRef
    ) {

    }

    ngOnInit() {
        if (this.queryService) {
            let serviceInstance = new this.queryService(this.http, this.genHeader);
            serviceInstance.search().then(result => {
                this.options = result.data;
                let _array = [];
                this.options.forEach((elm) => {
                    if (elm[this.valueField] == this.value) {
                        this.termInput = elm[this.labelField];
                        this.isDisabled = true;
                    }
                    let _option = {
                        'value': elm[this.valueField],
                        'label': elm[this.labelField]
                    };
                    _array.push(_option);
                });
                this.optionsArray = _array;
            });
        } else {
            this.optionsArray = this.options || [];
        }
    }

    ngDoCheck() {
        //this.modelChange.next(this.value);
    }

    // -------------------------------------
    // UI trigger
    onTermInputFocus() {
        this.displayOptions();
    }

    clickOption(val) {
        this.selected = val;
        this.enterOption();
    }

    //Hide option list if click outsite
    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) // or some similar check
            this.hideOptions()
    }

    moveOnOptions(event) {
        let selectionKeyCodes = [38, 40];
        let keyCode = event.keyCode;
        if (keyCode && (selectionKeyCodes.indexOf(keyCode) >= 0)) {
            if (keyCode == 40) {
                if (this.currentIndex == -1) {
                    this.currentIndex = 0;
                } else {
                    this.currentIndex = (this.currentIndex + 1) % this.optionsArray.length;
                }
            } else if (keyCode == 38) {
                if (this.currentIndex == -1) {
                    this.currentIndex = this.optionsArray.length - 1;
                } else if (this.currentIndex == 0) {
                    this.currentIndex = this.optionsArray.length - 1;
                } else {
                    this.currentIndex = (this.currentIndex - 1) % this.optionsArray.length;
                }
            }
            this.selected = this.optionsArray[this.currentIndex].value;
            // console.log(this.dropdownContainer.nativeElement.querySelector('.hovered-selection'));
            // let abc = this.dropdownContainer.nativeElement.querySelector('.hovered-selection');
            // console.log(this.dropdownContainer.nativeElement.children);
            // console.log(this.dropdownContainer.nativeElement.children.indexOf(abc));
            // console.log();
            return;
        }
    }

    ngAfterViewChecked() {
        let selectionElm = this.dropdownContainer.nativeElement.querySelector('.hovered-selection');
        if (selectionElm != null) {
            let collection = selectionElm.parentNode.children;
            let index = this.getIndexIn(collection, selectionElm);
            let height = index * selectionElm.offsetHeight;
            if ( (height + selectionElm.offsetHeight ) > this.dropdownContainer.nativeElement.offsetHeight
                || this.dropdownContainer.nativeElement.scrollTop != 0
            ) {
                this.dropdownContainer.nativeElement.scrollTop = height;
            }
        }
    }

    private getIndexIn(collection, elm): number {
        for (let i = 0; i < collection.length; i++) {
            if ( elm.isEqualNode(collection[i])) {
                return i;
            }
        }
        return -1;
    }

    // Narrow key => return;
    // Enter key => enterOption
    // Esc key => hideOptions
    // Refresh option list
    typing(event) {
        let selectionKeyCodes = [38, 40];
        let keyCode = event.keyCode;
        if (keyCode && (selectionKeyCodes.indexOf(keyCode) >= 0)) {
            return;
        }
        if (keyCode && keyCode == 13 && this.selected && this.currentIndex > -1) {
            this.enterOption();
            return;
        }

        if (keyCode && keyCode == 27) {
            this.hideOptions();
            return;
        }

        if (this.queryService) {
            this.displayOptions();
        } else {
            this.optionsArray = this.options;
            this.isHideOptions = false;
        }
    }

    // -------------------------------------
    // UI change
    hideOptions() {
        //this.termInput = '';
        this.isHideOptions = true;
        this.selected = null;
        this.currentIndex = -1;
    }

    cancelSelection() {
        this.termInput = '';
        this.selected = null;
        this.changeValue('');
        this.changeLabel('');
        setTimeout(() => {
            this.isDisabled = false;
        }, 100);
    }

    enterOption() {
        if (this.selected != null) {
            //this.value = this.selected;
            //Emit .....
            //
            //alert(this.value);
            let selection = this.getItem(this.selected);
            this.hideOptions();

            this.termInput = selection['label'];
            this.changeValue(selection['value']);
            this.changeLabel(selection['label']);
            this.isDisabled = true;

            // delete selection['value'];
            // delete selection['label'];
            // this.enterValueEvent.emit(selection);
        }
    }

    displayOptions() {
        this.query(this.termInput, (result) => {
            if (result.length > 0) {
                this.optionsArray = result;
                this.isHideOptions = false;
                this.dropdownInputWidth = this.dropdownInput.nativeElement.clientWidth;
                console.log(this.dropdownInput.nativeElement.clientWidth);
            } else {
                this.isHideOptions = true;
            }
            this.selected = null;
            this.currentIndex = -1;
        });
    }

    // -------------------------------------
    // Common methods
    query(term, callback) {
        if (this.queryService) {
            let serviceInstance = new this.queryService(this.http, this.genHeader);
            serviceInstance.search(term).then(result => {
                this.options = result.data;
                let _array = [];
                this.options.forEach((elm) => {
                    // let _option = {
                    //   'value': elm[this.valueField],
                    //   'label': elm[this.labelField]
                    // };
                    let _option = elm;
                    _option['value'] = elm[this.valueField];
                    _option['label'] = elm[this.labelField]
                    _array.push(_option);
                });
                //this.optionsArray = _array;
                //this.loaded = true;
                callback(_array);
                return;
            });
        }
        callback([]);
    };

    getLabel(array, value, valueField, labelField) {
        for (let i = 0; i < array.length; i++) {
            let elm = array[i];
            if (elm[valueField] == value) {
                return elm[labelField];
            }
        }
        return '';
    }

    getItem(val) {
        for (let i = 0; i < this.optionsArray.length; i++) {
            let elm = this.optionsArray[i];
            if (elm['value'] == val) {
                return elm;
            }
        }
        return undefined;
    }

    changeValue(val: string) {
        this.value = val;
        this.valueChange.emit(this.value);
    }

    changeLabel(val: string) {
        this.label = val;
        this.labelChange.emit(this.label);
    }
}
