import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { FormGroup } from '@angular/forms';
import { InputBase } from '../../models/input/input-base';
import { InputControlService } from '../../services/input-control.service';
import { TextboxInput } from '../../models/input/input-textbox';
import { DropdownInput } from '../../models/input/input-dropdown';

export class IMModalData extends BSModalContext {
    constructor(
        public inputs: InputBase<any>[] = [],
        public valueDictionary: {} = {},
        public title: string,
        public submit,
        public service
    ) {
        super();
    }
}

@Component({
    selector: 'modal-content',
    styles: [],
    templateUrl: './app/components/modal/im-modal.component.html',
})
export class IMModal implements ModalComponent<IMModalData>, OnInit {
    context: IMModalData;
    payLoad = '';

    constructor(
        public dialog: DialogRef<IMModalData>,
        private ics: InputControlService
    ) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    ngOnInit() {
        
    }

    onFormSubmit(event) {
        //console.log("PARENT");
        //console.log(event);
        this.dialog.close(event);
    }

    closeClick() {
        this.dialog.dismiss();
    }

    beforeDismiss(): boolean {
        console.log('DISMISS');
        return false;
    }

    beforeClose(): boolean {
        console.log('CLOSE');
        return false;
    }
}
