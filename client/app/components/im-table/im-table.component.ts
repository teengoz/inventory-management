import { ElementRef, Component, OnInit, Input, Output, AfterViewInit, ViewContainerRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { InputBase } from '../../models/input/input-base';
import { IMModal } from '../modal/im-modal.component';
import { DynamicFormService } from '../../services/form.services';

@Component({
    selector: 'im-table',
    templateUrl: './app/components/im-table/im-table.component.html',
    styleUrls: ['./app/components/im-table/im-table.component.css'],
    providers: [DynamicFormService]
})

export class IMTableComponent implements OnInit, AfterViewInit {
    @Input() service;
    @Input() columns;
    @Input() actions;
    @Input() options;

    data: any[];
    hasFilterRow = false;
    checkedBoxs = 0;
    isCheckedAll = false;
    inputs: InputBase<any>[];
    searchTerms = {};
    sort = {};
    paginationData = {
        total: 0,
        totalPage: 0,
        currentPage: 0
    };
    paramObject = {
        filter: {},
        sort: {}
    };
    collapse = true;

    //Resize table columns
    @ViewChild('table') private table: ElementRef;
    fixedCol;
    colWidth = [];
    minWidth = 130;
    isChanged = false;

    px: number;
    width: number;
    draggingCorner: boolean;
    left = 0;
    right = 0;
    beforeWidth = 0;
    lastOffset = 0;
    lastWindowsWidth = 0;

    ngAfterViewInit() {
        this.initWidth();
    }

    initWidth() {
        this.lastWindowsWidth = window.innerWidth;
        let fullWidth = this.table.nativeElement.parentNode.clientWidth - 151;
        this.table.nativeElement.style.width = fullWidth;
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i] && this.columns[i].width) {
                this.colWidth[i + 1] = (+this.columns[i].width / 10) * fullWidth;
            }
        }
        let thList = this.table.nativeElement.querySelectorAll('th');
        this.colWidth[0] = 50;
        this.colWidth[thList.length-1] = 100;
        for (let i = 0; i < thList.length; i++) {
            if (!this.colWidth[i]) {
                this.colWidth[i] = thList[i].clientWidth;
            }
        }
        // console.log("Real fullwidth: ", this.table.nativeElement.parentNode.clientWidth);
        // console.log("Fullwidth: ", fullWidth);
        // console.log("Table width: ", this.getTableWidth());
        // console.log("Col width: ", this.colWidth);
    }

    getTableWidth() {
        let width = 0;
        for (let i = 0; i < this.colWidth.length; i++) {
            width += +this.colWidth[i];
        }
        return width;
    }

    onResizeEdgeClick(event, left, right) {
        this.beforeWidth = event.target.parentNode.clientWidth;
        this.table.nativeElement.style.cursor = 'col-resize !important';
        this.draggingCorner = true;
        this.px = event.clientX;
        this.left = left;
        this.right = right;
        event.preventDefault();
        event.stopPropagation();
    }

    resize(left, right, offset) {
        if (left > -1 && this.fixedCol.indexOf(+left) < 0) {
            this.colWidth[left] = ((this.beforeWidth + offset) < this.minWidth) ? this.minWidth : this.beforeWidth + offset;
        }
    }

    @HostListener('document:mousemove', ['$event'])
    onCornerMove(event: MouseEvent) {
        if (!this.draggingCorner) {
            return;
        }
        let offset = event.clientX - this.px;
        this.lastOffset = offset;
        this.resize(this.left, this.right, offset);
    }

    @HostListener('document:mouseup', ['$event'])
    onCornerRelease(event: MouseEvent) {
        if (this.draggingCorner) {
            this.draggingCorner = false;
            this.left = 0;
            this.right = 0;
            this.beforeWidth = 0;
            // console.log(this.colWidth);
            // console.log(this.table.nativeElement.clientWidth);
            // console.log(this.lastOffset);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth != this.lastWindowsWidth &&
            ((event.target.innerWidth - 420) *(this.lastWindowsWidth - 420)) < 0
        ) {
            this.initWidth();
            // console.log('INIT WIDTH')
        }
    }

    // Test Datatable--------------------

    // ----------------------------------

    constructor(
        private router: Router,
        overlay: Overlay,
        vcRef: ViewContainerRef,
        public modal: Modal,
        private dfs: DynamicFormService
    ) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
        this.fixedCol = [0, this.columns.length + 1];
        this.draggingCorner = false;

        this.fetchData();
        if (this.columns) {
            this.columns.forEach(elm => {
                if (elm.filter) {
                    console.log(elm.filter);
                    this.hasFilterRow = true;
                }
            })
        } else {
            this.hasFilterRow = false;
        }
    }


    // -------------------------------------
    // Temporary actions
    // Test Datatable--------------------
    hello(data) {
        console.log(typeof data);
    }
    // ----------------------------------


    // -------------------------------------
    // Call service methods
    fetchData(parameters: any = { filter: {}, sort: {} }, page?: number, limit?: number): Promise<any[]> {
        let _page = page || this.paginationData.currentPage;
        if (this.isDefaultParam(this.paramObject) && this.isDefaultParam(parameters)) {
            return this.service.get(_page, limit).then(
                result => {
                    this.changeData(result);
                },
                error => console.log(error)
            );
        } else {
            let _param = (this.isDefaultParam(parameters)) ? this.paramObject : parameters;
            return this.service.query(_param, _page, limit).then(
                result => this.changeData(result),
                error => console.log(error)
            );
        }
    }

    private changeData(result) {
        this.data = result.data;
        this.paginationData['total'] = +result.meta.total;
        this.paginationData['totalPage'] = +result.meta.total_page;

        this.paginationData['currentPage'] = +result.meta.current_page;
        if (this.paginationData['currentPage'] > this.paginationData['totalPage']) {
            this.paginationData['currentPage'] = this.paginationData['totalPage'];
            this.turnPage(this.paginationData['currentPage']);
        }

        this.isCheckedAll = false;
    }

    // -------------------------------------
    // Common actions
    callDataAction(action: string, object: any = {}) {
        let inputs = this.dfs.getInputs(action);
        //let title = (object.stock_name) ? this.dfs.getTitle(action) + object.stock_name : this.dfs.getTitle(action);
        let title = this.dfs.getTitle(action);
        let submit = this.dfs.getSubmit(action);
        let service = this.dfs.getService(action);
        let dialog = this.modal.open(
            IMModal,
            overlayConfigFactory(
                { title, inputs, submit, service, valueDictionary: object },
                BSModalContext
            )
        );

        dialog.then(resultPromise => {
            return resultPromise.result
                .then(result => {
                    this.fetchData();
                    console.log(result);
                }, () => console.log('Rejected')
                );
        });
    }

    add() {
        this.callDataAction(this.actions['add']);
    }

    edit(object) {
        this.callDataAction(this.actions['edit'], object);
    }

    clone(object) {
        this.callDataAction(this.actions['add'], object);
    }

    onCollapse() {
        this.collapse = !this.collapse;
    }

    turnPage(page) {
        this.fetchData(this.paramObject, page);
    }

    onFilter(event) {
        if (event.target.value) {
            this.searchTerms[event.target.name] = event.target.value;
        } else {
            delete this.searchTerms[event.target.name];
        }
        this.paramObject['filter'] = this.searchTerms;
        this.paginationData.currentPage = 1;
        this.fetchData();
    }

    onBulkAction(event) {
        let action = event.target.value;
        let targets = this.data.filter(this.isChecked);
        if (targets.length > 0) {
            switch (action) {
                case 'delete':
                    let dialog = this.modal.confirm()
                        .title('Xác nhận xóa')
                        .showClose(true)
                        .size('sm')
                        .body('Bạn có đồng ý xóa các Kho đã chọn')
                        .open();

                    dialog.then(resultPromise => {
                        return resultPromise.result
                            .then(result => {
                                this.deleteItems(targets);
                            }, () => console.log('Rejected')
                            );
                    });

                    break;

                default:
                    break;
            }
        } else {
            let dialog = this.modal.confirm()
                .title('Không hợp lệ')
                .showClose(true)
                .size('sm')
                .body('Bạn cần chọn ít nhất một đối tượng để xử lý')
                .open();
        }
        event.target.options[0].selected = "selected";
    }

    onSortClick(event) {
        if (this.draggingCorner || !event.target.id) {
            return;
        }
        if (event.target.id && !this.sort[event.target.id]) {
            this.sort = {};
        }

        if (event.target.classList.contains('descending-sort')) {
            event.target.classList.remove('descending-sort');
            this.sort[event.target.id] = -1;
        } else {
            event.target.classList.add('descending-sort');
            this.sort[event.target.id] = 1;
        }

        this.paramObject.sort = this.sort;
        this.fetchData();
    }

    onCheck() {
        let check = 0;
        this.data.forEach(function (el, idx) {
            check += ((<any>el).checked) ? 1 : 0;
        });
        this.isCheckedAll = (check == this.data.length);
    }

    checkAll(event) {
        let check = event.target.checked;
        this.data.forEach(function (el, idx) {
            (<any>el).checked = check;
        });
    }

    onCheckRow(row) {
        row.checked = !row.checked;
        this.onCheck();
    }

    isChecked(object: any) {
        return object.checked;
    }

    // -------------------------------------
    // Utility methods
    getProp(item, path, first?: boolean) {
        let props = path.split('.');
        let current = item;

        try {
            for (let i = 0; i < props.length; i++) {
                if (current == undefined || current == 'undefined') {
                    return '';
                }
                else if (current[props[i]] == undefined || current[props[i]] == 'undefined') {
                    return '';
                }
                else {
                    current = current[props[i]];
                    if (first && Object.prototype.toString.call(current) === '[object Array]') {
                        current = current[0];
                    }
                }
            }
        }
        catch (e) {
            //console.log(e);
            return 'Lỗi truy xuất';
        }

        return current;
    }

    isDefaultParam(object): boolean {
        let defaultParam = {
            filter: {},
            sort: {}
        };

        return (JSON.stringify(defaultParam) == JSON.stringify(object));
    }

    _log(data) {
        console.log('-------log--------');
        console.log(data);
        console.log('------------------');
    }

    // -------------------------------------
    // Data actions
    delete(object) {
        event.stopPropagation();
        this.service.delete(object)
            .then(result => {
                if (result) {
                    this.fetchData();
                }
            });
    }

    deleteItems(objectList: any[]) {
        objectList.forEach((elm, index) => {
            this.delete(elm);
        });
    }
}