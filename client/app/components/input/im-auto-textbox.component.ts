import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'im-auto-textbox',
  templateUrl: './app/components/input/im-auto-textbox.component.html',
  styleUrls: ['./app/components/input/im-auto-textbox.component.css']
})

export class IMAutoTextboxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() input;
  @Input() value;
  constructor() {

  }

  ngOnInit() {
    this.form.controls[this.input.key].disable();
  }

  isAutoChecked(event) {
    if (event.target.checked) {
      this.form.controls[this.input.key].disable();
    } else {
      this.form.controls[this.input.key].enable();
    }
  }
}
