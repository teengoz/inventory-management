import { Injectable } from '@angular/core';
import { FORMS } from '../config/forms';

@Injectable()
export class DynamicFormService {
    getInputs(key: string) {
        return FORMS[key]['inputs'];
    }

    getTitle(key: string) {
        return FORMS[key]['title'];
    }

    getSubmit(key: string) {
        return FORMS[key]['submit'];
    }

    getService(key: string) {
        return FORMS[key]['service'];
    }
}