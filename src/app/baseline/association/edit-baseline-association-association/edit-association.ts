import { TextboxQuestion, CheckBoxQuestion, QuestionBase, RadioQuestion, DatePickerQuestion } from '../../../service/question'

export class FormGroupEditAssociation {
    getDetails(association: any) {
        let question: QuestionBase<any>[] = [new TextboxQuestion({
            key: 'Form_ID', required: false, order: 2,
            label: 'Form_ID', value: association.Form_ID,
        }),
        new TextboxQuestion({
            key: 'Association_Name', required: true, order: 3,
            label: 'Association_Name', value: association.Association_Name,
        }),
        new TextboxQuestion({
            key: 'Female_Members', required: true, order: 4,
            label: 'Female_Members', value: association.Female_Members,
        }),
        new TextboxQuestion({
            key: 'Male_Members', required: false, order: 5,
            label: 'Male_Members', value: association.Male_Members,
        }),
        /*new CheckBoxQuestion({
            key: 'ID_or_Passport', required: false, order: 6,
            label: 'ID_or_Passport', value: association.ID_or_Passport,
        }),*/
        new DatePickerQuestion({
            key: 'Date_Established', required: true, order: 7,
            label: 'Date_Established', value: association.Date_Established,
            min:1,max:20
        }),
        new TextboxQuestion({
            key: 'Mission', required: false, order: 8,
            label: 'Mission', value: association.Mission,
        }),
        new TextboxQuestion({
            key: 'Vision', required: true, order: 9,
            label: 'Vision', value: association.Vision,
            min:1,max:30
        }),
        new TextboxQuestion({
            key: 'Challenge', required: true, order: 10,
            label: 'Challenge', value: association.Challenge,
        }),
        new TextboxQuestion({
            key: 'Opportunities', required: true, order: 11,
            label: 'Opportunities', value: association.Opportunities,
        }),
        new TextboxQuestion({
            key: 'Sec_Agri', required: true, order: 12,
            label: 'Sec_Agri', value: association.Sec_Agri,
        }),
        new TextboxQuestion({
            key: 'Sec_Manu', required: true, order: 13,
            label: 'Sec_Manu', value: association.Sec_Manu,
        }),
        new TextboxQuestion({
            key: 'Sec_Minerals', required: true, order: 14,
            label: 'Sec_Minerals', value: association.Sec_Minerals,
        }),
        new TextboxQuestion({
            key: 'Sec_Arts', required: true, order: 15,
            label: 'Sec_Arts', value: association.Sec_Arts,
         }),
        new TextboxQuestion({
            key: 'Sec_General', required: true, order: 16,
            label: 'Sec_General', value: association.Sec_General,
        }),
        new TextboxQuestion({
            key: 'Sec_Retail', required: true, order: 17,
            label: 'Sec_Retail', value: association.Sec_Retail,
        }),
        new TextboxQuestion({
            key: 'Sec_Other', required: true, order: 18,
            label: 'Sec_Other', value: association.Sec_Other,
        }),
        new TextboxQuestion({
            key: 'Sec_Specify', required: true, order: 19,
            label: 'Sec_Specify', value: association.Sec_Specify,
        })
    ];
        return question;

    }
    getLeadership(association:any) {
        let questions: QuestionBase<any>[] = [
        new RadioQuestion({
            key: 'Leadership_Structure', required: false,order: 47,
            label: 'Leadership_Structure', value: association.Leadership_Structure}),
        new TextboxQuestion({
            key: 'Female_Leaders', required: false, order: 43,
            label: 'Female_Leaders', value: association.Female_Leaders,}),
        new TextboxQuestion({
            key: 'Male_Leaders', required: false, order: 43,
            label: 'Male_Leaders', value: association.Male_Leaders,}),           
        new RadioQuestion({
            key: 'Constitution', required: false,order: 47,
            label: 'Constitution', value: association.Constitution}),
        new RadioQuestion({
            key: 'Leadership_Meet', required: false,order: 47,
            label: 'Leadership_Meet', value: association.Leadership_Meet}),
        new RadioQuestion({
            key: 'Leadership_Meet_Records', required: false,order: 47,
            label: 'Leadership_Meet_Records', value: association.Leadership_Meet_Records}),
        new RadioQuestion({
            key: 'General_Meet', required: false,order: 47,
            label: 'General_Meet', value: association.General_Meet}),
        new RadioQuestion({
            key: 'General_Meet_Records', required: false,order: 47,
            label: 'General_Meet_Records', value: association.General_Meet_Records}),
        new RadioQuestion({
            key: 'Account_Records', required: false,order: 47,
            label: 'Account_Records', value: association.Account_Records}),
        new RadioQuestion({
            key: 'Decision_Making', required: false,order: 47,
            label: 'Decision_Making', value: association.Decision_Making}),
        new RadioQuestion({
            key: 'Meeting_Procedures', required: false,order: 47,
            label: 'Meeting_Procedures', value: association.Meeting_Procedures}),
        new RadioQuestion({
            key: 'Admin_Capacity', required: false,order: 47,
            label: 'Admin_Capacity', value: association.Admin_Capacity}),
        new RadioQuestion({
            key: 'Constitution_Comply', required: false,order: 47,
            label: 'Constitution_Comply', value: association.Constitution_Comply}),
        new RadioQuestion({
            key: 'Retention', required: false,order: 47,
            label: 'Retention', value: association.Retention}),
        new RadioQuestion({
            key: 'Access_Services', required: false,order: 47,
            label: 'Access_Services', value: association.Access_Services}),
        new RadioQuestion({
            key: 'Offer_Services', required: false,order: 47,
            label: 'Offer_Services', value: association.Offer_Services}),
        new RadioQuestion({
            key: 'Capacity_Gaps', required: false,order: 47,
            label: 'Capacity_Gaps', value: association.Capacity_Gaps}),
        new RadioQuestion({
            key: 'Networking', required: false,order: 47,
            label: 'Networking', value: association.Networking}),
        ];
        return questions;

    }
    getContact(association:any){
        let questions:QuestionBase<any>[] = [new TextboxQuestion({
            key: 'Province_ID', required: false,order: 65,
            label: 'Province_ID', value: association.Province_ID,
        }),
        new TextboxQuestion({
            key: 'District_Metro_ID', required: false,order: 66,
            label: 'District_Metro_ID', value: association.District_Metro_ID,
        }),
        new TextboxQuestion({
            key: 'Municipality_ID', required: false,order: 67,
            label: 'Municipality_ID', value: association.Municipality_ID,
        }),
        new TextboxQuestion({
            key: 'Main_Place_ID', required: false,order: 68,
            label: 'Main_Place_ID', value: association.Main_Place_ID,
        }),
        new TextboxQuestion({
            key: 'Suburb_ID', required: false,order: 69,
            label: 'Suburb_ID', value: association.Suburb_ID,
        }),
        new TextboxQuestion({
            key: 'Ward', required: false,order: 70,
            label: 'Ward', value: association.Ward,
        }),
        new TextboxQuestion({
            key: 'Address_Line1', required: false,order: 71,
            label: 'Address_Line1', value: association.Address_Line1,
        }),
        new TextboxQuestion({
            key: 'Address_Line2', required: false,order: 72,
            label: 'Address_Line2', value: association.Address_Line2,
        }),
        new TextboxQuestion({
            key: 'City', required: false,order: 73,
            label: 'City', value: association.City,
        }),
        new TextboxQuestion({
            key: 'Postal_Code', required: false,order: 74,
            label: 'Postal_Code', value: association.Postal_Code,
        }),
        new TextboxQuestion({
            key: 'GPS_Latitude', required: false,order: 75,
            label: 'GPS_Latitude', value: association.GPS_Latitude,
        }),
        new TextboxQuestion({
            key: 'GPS_Longitude', required: false,order: 76,
            label: 'GPS_Longitude', value: association.GPS_Longitude,
        }),
        new TextboxQuestion({
            key: 'Phone', required: false,order: 77,
            label: 'Phone', value: association.Phone,
        }),
        new TextboxQuestion({
            key: 'Mobile_Phone', required: false,order: 78,
            label: 'Mobile_Phone', value: association.Mobile_Phone,
        }),
        new TextboxQuestion({
            key: 'Email', required: false,order: 79,
            label: 'Email', value: association.Email,
        }),
        new TextboxQuestion({
            key: 'Country_ID', required: false,order: 80,
            label: 'Country_ID', value: association.Country_ID,
        })];
        return questions;
    }
}
