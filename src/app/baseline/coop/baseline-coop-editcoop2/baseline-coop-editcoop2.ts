import { MemoQuestion,TextboxQuestion,DropdownQuestion,Options,ToggleQuestion , NumbersQuestion, QuestionBase, RadioQuestion } from '../../../service/question'
import { EwepserverService } from '../../../ewepserver.service'

export class FormGroupBaselineCoopEditcoop2 {
    constructor(private ewepServer: EwepserverService) { 
    
    }

    getEnterpriseGenralForm(enterprise:any){
        let questions: QuestionBase<any>[] = [
            new NumbersQuestion({
                key: 'Year_Established', required: true,order: 3,
                label: 'Year Established', value: enterprise.Year_Established,
                max:(new Date().getFullYear()),min:1988
            }),           
            new DropdownQuestion({
                key: 'Legal_Structure',  required: false, order: 4,
                options: this.ewepServer.CooperativeType, 
                label: 'Cooperative Type',
                value: enterprise.Legal_Structure,
            }),
            new ToggleQuestion({
                key: 'Registered_Y_N', required: false,order: 5,
                label: 'Registered', value: enterprise.Registered_Y_N,
            }),
            new TextboxQuestion({
                key: 'Registration_Number', required: false,order: 6,
                label: 'Registration Number', value: enterprise.Registration_Number,
                min:1,max:10
            }),
            new NumbersQuestion({
                key: 'Female_Owners', required: true,order: 6,
                label: 'No of Female Owners', value: enterprise.Female_Owners,
                min:0,max:20
            }),
            new NumbersQuestion({
                key: 'Male_Owners', required: true,order: 7,
                label: 'No of Male Owners', value: enterprise.Male_Owners,
                min:0,max:20
            }),
            new ToggleQuestion ({
                key: 'Location_Same', required: false,order: 8,
                label: 'Is location same as residence?', value: enterprise.Location_Same,
            }),
            new RadioQuestion({
                key: 'Premise_Own', required: false,order: 9,
                label: 'Premise Own', value: enterprise.Premise_Own,
                options:[new Options("Owned","Owned"),new Options("Rented","Rented"),
                         new Options("Co-Tenant","Co-Tenant"),new Options("Government Premises","Government Premises"),
                         new Options("Home Based","Home Based") ]
            }),
            new ToggleQuestion({
                key: 'Family_Owned',  required: false, order: 10,
                label: 'Is Business Family owned?', value: enterprise.Family_Owned,
            }),
            new ToggleQuestion({
                key: 'Group_Owned', required: false,order: 11,
                label: 'Is Business Group owned?', value: enterprise.Group_Owned,
            }),
            new TextboxQuestion({
                key: 'Contact_Person', required: false,order: 12,
                label: 'Contact Person', value: enterprise.Contact_Person,
            }),
            new NumbersQuestion({
                key: 'Year_Started_AWOME', required: true,order: 13,
                label: 'Year started with AWOME', value: enterprise.Year_Started_AWOME,
                max:(new Date().getFullYear()),min:2018
            }),
            new TextboxQuestion({
                key: 'Responsible_Trainer', required: false,order: 14,
                label: 'Responsible Trainer', value: enterprise.Responsible_Trainer,
            }),
            new MemoQuestion({
                key: 'Vision', required: false,order: 15,
                label: 'What is your Vision for your business', value: enterprise.Vision,
            }),
            new MemoQuestion({
                key: 'Future_Plans', required: false,order: 16,
                label: 'What are your plans for the business in the near future', value: enterprise.Future_Plans,
            }),
            new MemoQuestion({
                key: 'Obstacles', required: false,order: 17,
                label: 'What are you biggest obstacles', value: enterprise.Obstacles,
            }),
            new ToggleQuestion({
                key: 'Employee_Contracts', required: false,order: 18,
                label: 'Do you issue Employment Contracts', value: enterprise.Employee_Contracts,
            }),
        ];
        return questions.sort((a, b) => a.order - b.order);
      }
}
