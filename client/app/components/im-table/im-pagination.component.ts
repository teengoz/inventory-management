import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'im-pagination',
    templateUrl: './app/components/im-table/im-pagination.component.html',
    styleUrls: ['./app/components/im-table/im-pagination.component.css']
})

export class IMPagination implements OnInit, DoCheck {
    @Input() data;
    @Output() turnPage = new EventEmitter<number>();

    SLOT = 4;
    range = [];
    displayRange = [];
    oldData = {};

    // Test Datatable--------------------

    // ----------------------------------

    constructor() {

    }

    ngOnInit() {

    }

    ngDoCheck() {
        // console.log('XXXXXXX===================');
        // console.log(1);
        // console.log(this.data);
        // console.log(this.oldData);
        if (!this.comparePaginationData()) {
            // console.log(2);
            // console.log(this.data);
            // console.log(this.oldData);
            this.refreshRange();
            this.oldData = Object.assign({}, this.data);
        }
        // console.log(3);
        // console.log(this.data);
        // console.log(this.oldData);
    }


    // -------------------------------------
    // Utility methods
    comparePaginationData(): boolean {
        return (
            this.data['total'] == this.oldData['total'] &&
            this.data['totalPage'] == this.oldData['totalPage'] &&
            this.data['currentPage'] == this.oldData['currentPage']
        );
    }

    refreshRange() {
        this.createRange();
        this.createDisplayRange();
    }

    createRange() {
        this.createDisplayRange();
        let range = [];
        for (var i = 1; i <= this.data.totalPage; i++) {
            range.push(i);
        }
        this.range = range;
    }

    createDisplayRange() {
        let pivot = +this.data.currentPage;
        let slot = this.SLOT;
        let first;
        let last;

        let a = Math.min(Math.floor(slot / 2), this.data.totalPage - pivot);
        last = pivot + a;
        slot = slot - a;

        let b = Math.min(slot, pivot - 1)
        first = pivot - b;
        slot = slot - b;

        let c = Math.min(slot, this.data.totalPage - last);
        last = last + c;

        let displayRange = []
        for (let i = first; i <= last; i++) {
            displayRange.push(i);
        }
        this.displayRange = displayRange;
    }


    // -------------------------------------
    // Common actions
    gotoPage(event) {
        let value: number = +event.target.value;
        if (event.keyCode == 13 && this.range.indexOf(value) >= 0 && value != this.data.currentPage) {
            this.onTurnPage(value);
            this.refreshRange();
        }
    }

    goFirstPage() {
        this.onTurnPage(1);
        this.refreshRange();
    }

    goLastPage() {
        this.onTurnPage(this.data.totalPage);
        this.refreshRange();
    }

    onTurnPage(page) {
        this.data.currentPage = +page;
        this.turnPage.emit(+page);
        this.refreshRange();
    }


    // -------------------------------------
    // Data actions

}