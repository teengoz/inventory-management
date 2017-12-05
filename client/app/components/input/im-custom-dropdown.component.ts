import { AfterViewChecked, Component, Input, Output, OnInit, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FormGroup } from '@angular/forms';

import { GenerateHeader } from '../../services/generate-header';

@Component({
  selector: 'im-custom-dropdown',
  templateUrl: './app/components/input/im-custom-dropdown.component.html',
  styleUrls: ['./app/components/input/im-custom-dropdown.component.css'],
  host: { '(document:click)': 'onClick($event)' }
})

export class IMCustomDropdownComponent implements OnInit, AfterViewChecked {
  @Input() options;
  @Input() value;
  @Input() queryService;
  @Input() canCancelSelection;
  @Input() valueField;
  @Input() labelField;
  @Output() enterValueEvent = new EventEmitter<any>();
  @ViewChild('dropdownContainer') private dropdownContainer: ElementRef;

  optionsArray = [];
  loaded = false;
  isHideOptions = true;
  isEditing = false;
  selected = null;
  isDisabled = false;
  currentIndex = -1;
  termInput = '';

  constructor(
    private http: Http,
    private genHeader: GenerateHeader,
    private _eref: ElementRef
  ) {
  }

  ngOnInit() {
    this.valueField = 'inventoryItemId';
    this.labelField = 'inventoryItemName';
    // if (this.queryService) {
    //   let serviceInstance = new this.queryService(this.http, this.genHeader);
    //   serviceInstance.hint().then(result => {
    //     this.options = result.data;
    //     let _array = [];
    //     this.options.forEach((elm) => {
    //       let _option = {
    //         'value': elm[this.valueField],
    //         'label': elm[this.labelField]
    //       };
    //       _array.push(_option);
    //     });
    //     this.optionsArray = _array;
    //     this.loaded = true;
    //   });
    // } else {
    //   this.optionsArray = this.options;
    //   this.loaded = true;
    // }
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
      return;
    }
  }

  ngAfterViewChecked() {
    let selectionElm = this.dropdownContainer.nativeElement.querySelector('.hovered-selection');
    if (selectionElm != null) {
      let collection = selectionElm.parentNode.children;
      let index = this.getIndexIn(collection, selectionElm);
      let height = index * selectionElm.offsetHeight;
      if ((height + selectionElm.offsetHeight) > this.dropdownContainer.nativeElement.offsetHeight
        || this.dropdownContainer.nativeElement.scrollTop != 0
      ) {
        this.dropdownContainer.nativeElement.scrollTop = height;
      }
    }
  }

  private getIndexIn(collection, elm): number {
    for (let i = 0; i < collection.length; i++) {
      if (elm.isEqualNode(collection[i])) {
        return i;
      }
    }
    return -1;
  }

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
      this.loaded = true;
    }
  }

  // -------------------------------------
  // UI change
  hideOptions() {
    this.termInput = '';
    this.isHideOptions = true;
    this.selected = null;
    this.currentIndex = -1;
  }

  cancelSelection() {
    if (!!this.canCancelSelection) {
      this.value = '';
      this.selected = null;
      this.isDisabled = false;
    }
  }

  displayOptions() {
    if (this.termInput && this.termInput.trim() != '') {
      this.query(this.termInput, (result) => {
        if (result.length > 0) {
          this.optionsArray = result;
          console.log(this.optionsArray);
          this.isHideOptions = false;
        } else {
          this.isHideOptions = true;
        }
        this.selected = null;
        this.currentIndex = -1;
      });
    } else {
      this.hideOptions();
    }
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

  enterOption() {
    if (this.selected != null) {
      this.value = this.selected;
      //Emit .....
      //
      //alert(this.value);
      // let selection = {
      //   'value': this.selected,
      //   'label': this.getLabel(this.selected)
      // };
      let selection = this.getItem(this.selected);
      delete selection['value'];
      delete selection['label'];
      this.enterValueEvent.emit(selection);
      this.hideOptions();
      if (!!this.canCancelSelection) {
        this.isDisabled = true;
      }
    }
  }

  getLabel(val) {
    for (let i = 0; i < this.optionsArray.length; i++) {
      let elm = this.optionsArray[i];
      if (elm['value'] == val) {
        return elm['label'];
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
}
