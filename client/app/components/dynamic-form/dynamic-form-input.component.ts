import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from '../../models/input/input-base';

@Component({
  selector: 'df-input',
  templateUrl: './app/components/dynamic-form/dynamic-form-input.component.html',
  styleUrls: ['./app/components/dynamic-form/dynamic-form.component.css'],
})

export class DynamicFormInputComponent {
  @Input() input: InputBase<any>;
  @Input() values;
  @Input() form: FormGroup;

  constructor() {

  }

  get isValid() {
    if (!this.form.controls[this.input.key]) {
      return false;
    }
    return this.form.controls[this.input.key].valid;
  }
  get isTouched() {
    if (!this.form.controls[this.input.key]) {
      return false;
    }
    return this.form.controls[this.input.key].touched;
  }
  get isDirty() {
    if (!this.form.controls[this.input.key]) {
      return false;
    }
    return this.form.controls[this.input.key].dirty;
  }

  // -------------------------------------
  // Utility methods
  getProp(item, path, first?: boolean) {
    let props = path.split('.');
    let current = item;
    try {
      if (current == undefined) {
        return '';
      }
      if (Object.prototype.toString.call(item) === '[object String]') {
        return item;
      }
      if (current[path] && Object.prototype.toString.call(current[path]) === '[object String]') {
        current = current[path]
      } else {
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
    }
    catch (e) {
      console.log(e);
      return 'Lỗi truy xuất';
    }
    return current;
  }
}
