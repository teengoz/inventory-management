import { InputBase } from './input-base';

export class AutoTextboxInput extends InputBase<string> {
    controlType = 'auto-textbox';
    type: string;

    constructor (options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.inputWidth = options['inputWidth'] || 9;
    }
}