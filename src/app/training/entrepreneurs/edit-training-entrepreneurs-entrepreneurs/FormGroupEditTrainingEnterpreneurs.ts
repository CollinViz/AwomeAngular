import { TextboxQuestion,DatePickerQuestion,DropdownQuestion, QuestionBase } from '../../../service/question'


export class FormGroupEditTrainingEntrepreneur{
    getTraining(){
        let question:QuestionBase<any>[] = [
            new TextboxQuestion({
                key: 'EntrepreneurTraining_ID', required: false, order: 2,
                label: 'EntrepreneurTraining_ID', value: '',
            }),
            new DropdownQuestion({
                key: 'Training_ID', required: true, order: 2,
                label: 'Training_ID', value: '',
            }),
            new DatePickerQuestion({
                key: 'Date_Started', required: true, order: 2,
                label: 'Date_Started', value: '',
            }),
            new DropdownQuestion({
                key: 'Status', required: true, order: 2,
                label: 'Status', value: '',
            }),
            new DatePickerQuestion({
                key: 'Date_Completed', required: false, order: 2,
                label: 'Date_Completed', value: '',
            }),
            new DropdownQuestion({
                key: 'Trainer_ID', required: true, order: 2,
                label: 'Trainer_ID', value: '',
            }), 
            new TextboxQuestion({
                key: 'Entrepreneur_ID', required: false, order: 2,
                label: 'Entrepreneur_ID', value: '',
            }),
        ];
        return question;
    }
}