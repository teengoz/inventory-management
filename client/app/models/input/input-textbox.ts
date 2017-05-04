import { InputBase } from './input-base';

export class TextboxInput extends InputBase<string> {
    controlType = 'textbox';
    type: string;
    canAutoGenerate: boolean;

    constructor (options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.inputWidth = options['inputWidth'] || 9;
        this.canAutoGenerate = options['canAutoGenerate'] || false;
    }
}