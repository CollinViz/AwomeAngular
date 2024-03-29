import { QuestionBase } from './question-base';

export class DatePickerQuestion extends QuestionBase<string> {
  controlType = 'datepicker';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || ''; 
  }
}
