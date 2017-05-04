import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FormGroup } from '@angular/forms';

import { InputBase } from '../../models/input/input-base';
import { InputControlService } from '../../services/input-control.service';
import { AdditionCalculateWindowData } from "../modal/custom-modal-sample.component";
import { GenerateHeader } from '../../services/generate-header';

@Component({
  selector: 'dynamic-form',
  templateUrl: './app/components/dynamic-form/dynamic-form.component.html',
  styleUrls: ['./app/components/dynamic-form/dynamic-form.component.css'],
  providers: [InputControlService]
})

export class DynamicFormComponent implements OnInit {
  @Input() context: any;
  @Output() onChildEvent = new EventEmitter<any>();
  @Output() onFormSubmit = new EventEmitter<any>();

  form: FormGroup;
  values;
  inputs = [];
  submit;
  service;

  constructor(
    private ics: InputControlService,
    private http: Http,
    private genHeader: GenerateHeader
  ) {

  }

  ngOnInit() {
    this.inputs = this.context.inputs;
    this.submit = this.context.submit;
    this.service = this.context.service;
    this.values = this.context.valueDictionary;
    this.form = this.ics.toFormGroup(this.inputs);
  }

  onSubmit(empForm: any, event: Event) {
    event.preventDefault();
    if (!!this.service && !!this.submit) {
      let serviceInstance = new this.service(this.http, this.genHeader);
      serviceInstance[this.submit](this.form.value)
        .then(result => {
          if (result.success) {
            this.onFormSubmit.emit(this.form.value);
          } else {
            console.log(result.error);
          }
        }, error => {
          console.log(error);
        });
    } else {
      this.onFormSubmit.emit(this.form.value);
    }
  }

  //----------------------------------------------------
  //Fake data
  newnew(o) {
    console.log(o);
    let serviceInstance = new this.service(this.http, this.genHeader);
    serviceInstance['save'](o)
      .then(result => {
        if (result.success) {
          //this.onFormSubmit.emit();
        } else {
          //console.log(result.error)
        }
      }, error => {
        //console.log(error);
      });
  }

  private newStocks() {
    console.log('newStocks');
    let names = [
      'KHO ADC',
      'KHO 9921',
      'KHO CTOOA',
      'KHO 190',
      'KHO C718',
      'KHO POA',
      'KHO CCAAEF',
      'KHO 324324NA',
      'KHO 99UA1',
      'KHO 2376',
      'KHO 4389',
      'KHO 3231',
      'KHO 1929',
      'KHO MCIR',
      'KHO OLIR',
      'KHO YCHKM',
    ];

    let addresses = [
      'Quận Lại Quang Phước, Kiên Giang',
      'Huyện 25, Hải Dương',
      'Xã Nhiệm, Huyện Hy, Gia Lai',
      'Xã Thắm, Quận 6, Hải Phòng',
      'Quận Ngân Vỹ Bắc, Hải Phòng',
      'Huyện Kim Đăng Hà, Cần Thơ',
      'Quận An Quân Ngân, Thừa Thiên Huế',
      'Huyện Trung Triệu, Vĩnh Long',
      'Quận Thạch, Thái Nguyên',
      'Quận Lưu Uy, Đắk Nông',
    ];

    for (let i = 1; i <= 50; i++) {
      console.log(i);
      let n1 = Math.floor(Math.random() * names.length);
      let n2 = Math.floor(Math.random() * addresses.length);

      let o = {
        stock_code: i,
        stock_name: names[n1],
        stock_address: addresses[n2]
      }

      this.newnew(o);
    }
  }
}
