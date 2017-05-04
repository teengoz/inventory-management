import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputBase } from '../models/input/input-base';

@Injectable()
export class InputControlService {
  constructor() { }

  toFormGroup(inputs: InputBase<any>[] ) {
    let group: any = {};

    inputs.forEach(input => {
      let formState = {
        'value': input.value,
        'disabled': false
      };
      
      group[input.key] = input.required ? new FormControl(formState|| '', Validators.required)
                                        : new FormControl(formState || '');
    });
    return new FormGroup(group);
  }
}