export class InputBase<T>{
  value: T;
  key: string;
  label: string;
  hintService: any;
  keyField: string;
  valueField: string;
  required: boolean;
  order: number;
  controlType: string;
  inline: boolean;
  labelWidth: number;
  inputWidth: number;
  column: number;
  hidden: boolean;
  disabled: boolean;
  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      hintService?: any,
      keyField?: string,
      valueField?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      dataSource?: string,
      inline?: boolean,
      labelWidth?: number,
      inputWidth?: number,
      column?: number,
      hidden?: boolean,
      disabled?: boolean
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.keyField = options.keyField || 'key';
    this.valueField = options.valueField || 'value';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.hintService = options.hintService || null;
    this.inline = options.inline || false;
    this.labelWidth = options.labelWidth || 3;
    this.inputWidth = options.inputWidth || 9;
    this.column = options.column || 12;
    this.hidden = options.hidden || false;
    this.disabled = options.disabled || false;
  }
}