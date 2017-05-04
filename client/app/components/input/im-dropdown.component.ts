import { Component, Input, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FormGroup } from '@angular/forms';

import { GenerateHeader } from '../../services/generate-header';

@Component({
  selector: 'im-dropdown',
  templateUrl: './app/components/input/im-dropdown.component.html'
  //styleUrls: ['./app/components/input/dropdown.component.css'],
})

export class IMDropdownComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() input;
  @Input() value;

  optionsArray = [];
  loaded = false;

  constructor(
    private http: Http,
    private genHeader: GenerateHeader
  ) {
  }

  ngOnInit() {
    if (this.input.hintService) {
      let serviceInstance = new this.input.hintService(this.http, this.genHeader);
      serviceInstance.hint().then(result => {
        this.input.options = result.data;
        let _array = [];
        this.input.options.forEach((elm) => {
          let _option = {
            'value': elm[this.input.keyField],
            'label': elm[this.input.valueField]
          };
          _array.push(_option);
        });
        this.optionsArray = _array;
        this.form.controls[this.input.key].setValue(this.value);
        this.loaded = true;
      });
    } else {
      this.optionsArray = this.input.options;
      this.form.controls[this.input.key].setValue(this.value);
      this.loaded = true;
    }
  }

}
