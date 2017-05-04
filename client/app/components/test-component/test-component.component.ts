import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../app.animation';

@Component({
  selector: 'im-test-component',
  templateUrl: './app/components/test-component/test-component.component.html',
  styleUrls: ['./app/components/test-component/test-component.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})

export class TestComponent implements OnInit, AfterViewInit {
  @ViewChild('table') private table: ElementRef;
  colWidth = [
    0, 0, 0, 0, 0
  ];
  fixedCol = [0, 4];
  minWidth = 100;
  initTableWidth;
  isChanged = false;

  px: number;
  width: number;
  draggingCorner: boolean;
  left = 0;
  right = 0;
  beforeWidth = 0;

  constructor() {
    this.draggingCorner = false;
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    if (!this.isChanged) {
      this.table.nativeElement.style.width = this.table.nativeElement.parentNode.clientWidth;
      this.isChanged = true;
    }
    let thList = this.table.nativeElement.querySelectorAll('th');
    let tableWidth = 0;
    for (let i = 0; i < thList.length; i++) {
      this.colWidth[i] = thList[i].clientWidth;
      tableWidth += thList[i].clientWidth;
    }
    this.initTableWidth = 0;
  }

  getTableWidth() {
    let width = 0;
    for (let i = 0; i < this.colWidth.length; i++) {
      width += this.colWidth[i];
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
    if (left > -1 && this.fixedCol.indexOf(+left) < 0 ) {
      this.colWidth[left] = ((this.beforeWidth + offset) < this.minWidth) ? this.minWidth : this.beforeWidth + offset;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent) {
    if (!this.draggingCorner) {
      return;
    }
    let offset = event.clientX - this.px;
    this.resize(this.left, this.right, offset);
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.draggingCorner = false;
    this.left = 0;
    this.right = 0;
    this.beforeWidth = 0;
  }
}