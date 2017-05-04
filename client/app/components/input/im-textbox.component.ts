import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'im-textbox',
  templateUrl: './app/components/input/im-textbox.component.html'
})

export class IMTextboxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() input;
  @Input() value;
  constructor() {

  }

  ngOnInit() {
    if (this.input.disabled) {
      this.form.controls[this.input.key].disable();
    } else {
      this.form.controls[this.input.key].enable();
    }
  }
}
