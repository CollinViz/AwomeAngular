import { TextboxQuestion, CheckBoxQuestion, QuestionBase, RadioQuestion } from '../../../service/question'

export class FormGroupEditMemberBaselineEnterprise {
    getGeneral(entrepreneur: any) {
        let question: QuestionBase<any>[] = [new TextboxQuestion({
            key: 'Form_ID', required: false, order: 2,
            label: 'Form_ID', value: entrepreneur.Form_ID,
        }),
        new TextboxQuestion({
            key: 'Name', required: true, order: 3,
            label: 'Name', value: entrepreneur.Name,
        }),
        new TextboxQuestion({
            key: 'Surname', required: true, order: 4,
            label: 'Surname', value: entrepreneur.Surname,
        }),
        new TextboxQuestion({
            key: 'Known_As', required: false, order: 5,
            label: 'Known_As', value: entrepreneur.Known_As,
        }),
        new CheckBoxQuestion({
            key: 'ID_or_Passport', required: false, order: 6,
            label: 'ID_or_Passport', value: entrepreneur.ID_or_Passport,
        }),
        new TextboxQuestion({
            key: 'ID_Passport', required: true, order: 7,
            label: 'ID_Passport', value: entrepreneur.ID_Passport,
            min:1,max:20
        }),
        new TextboxQuestion({
            key: 'Expiration_Date', required: false, order: 8,
            label: 'Expiration_Date', value: entrepreneur.Expiration_Date,
        }),
        new TextboxQuestion({
            key: 'Nationality', required: true, order: 9,
            label: 'Nationality', value: entrepreneur.Nationality,
            min:1,max:30
        }),
        new TextboxQuestion({
            key: 'Language', required: true, order: 10,
            label: 'Language', value: entrepreneur.Language,
        }),
        new TextboxQuestion({
            key: 'Race', required: true, order: 11,
            label: 'Race', value: entrepreneur.Race,
        }),
        new TextboxQuestion({
            key: 'Sex', required: true, order: 12,
            label: 'Sex', value: entrepreneur.Sex,
        }),
        new TextboxQuestion({
            key: 'Birth_Date', required: true, order: 13,
            label: 'Birth_Date', value: entrepreneur.Birth_Date,
        }),
        new TextboxQuestion({
            key: 'Marital_Status', required: true, order: 14,
            label: 'Marital_Status', value: entrepreneur.Marital_Status,
        }),
        new TextboxQuestion({
            key: 'Children', required: true, order: 15,
            label: 'Children', value: entrepreneur.Children,
            min:0,max:999
        }),
        new TextboxQuestion({
            key: 'Children_In_School', required: true, order: 16,
            label: 'Children_In_School', value: entrepreneur.Children_In_School,
            min:0,max:999
        }),
        new TextboxQuestion({
            key: 'People_Supported', required: true, order: 17,
            label: 'People_Supported', value: entrepreneur.People_Supported,
            min:0,max:999
        }),
        new TextboxQuestion({
            key: 'People_Employed_Household', required: true, order: 18,
            label: 'People_Employed_Household', value: entrepreneur.People_Employed_Household,
            min:0,max:999
        }),
        new TextboxQuestion({
            key: 'People_In_Household', required: true, order: 19,
            label: 'People_In_Household', value: entrepreneur.People_In_Household,
            min:0,max:999
        }),
        new TextboxQuestion({
            key: 'Income_Before_Awome', required: true, order: 20,
            label: 'Income_Before_Awome', value: entrepreneur.Income_Before_Awome,
            min:1,max:99999999
        }),
        new TextboxQuestion({
            key: 'Education_Level', required: true, order: 23,
            label: 'Education_Level', value: entrepreneur.Education_Level,
        }),
        new TextboxQuestion({
            key: 'Bank_Account', required: false, order: 24,
            label: 'Bank_Account', value: entrepreneur.Bank_Account,
        }),
        new TextboxQuestion({
            key: 'Support_Grant', required: false, order: 25,
            label: 'Support_Grant', value: entrepreneur.Support_Grant,
        }),
        new TextboxQuestion({
            key: 'Support_Any_Grant', required: false, order: 25,
            label: 'Support_Any_Grant', value: entrepreneur.Support_Any_Grant,
        }),
        new TextboxQuestion({
            key: 'Support_Pension', required: false, order: 26,
            label: 'Support_Pension', value: entrepreneur.Support_Pension,
        }),
        new TextboxQuestion({
            key: 'Support_Family', required: false, order: 27,
            label: 'Support_Family', value: entrepreneur.Support_Family,
        }),
        new TextboxQuestion({
            key: 'Support_Savings', required: false, order: 28,
            label: 'Support_Savings', value: entrepreneur.Support_Savings,
        }),
        new TextboxQuestion({
            key: 'Support_NA', required: false, order: 28,
            label: 'Support_NA', value: entrepreneur.Support_NA,
        }),
        new TextboxQuestion({
            key: 'Support_Other', required: false, order: 29,
            label: 'Support_Other', value: entrepreneur.Support_Other,
        }),
        new TextboxQuestion({
            key: 'Support_Specify', required: false, order: 30,
            label: 'Support_Specify', value: entrepreneur.Support_Specify,
        }),
        new TextboxQuestion({
            key: 'Challenge', required: false, order: 31,
            label: 'Challenge', value: entrepreneur.Challenge,
        }), 
        new TextboxQuestion({
            key: 'Challenge_Specify', required: false, order: 37,
            label: 'Challenge_Specify', value: entrepreneur.Challenge_Specify,
        }),
        new TextboxQuestion({
            key: 'Is_Disabled', required: false, order: 38,
            label: 'Is_Disabled', value: entrepreneur.Is_Disabled,
        }),
        new TextboxQuestion({
            key: 'Disabled_Specify', required: false, order: 39,
            label: 'Disabled_Specify', value: entrepreneur.Disabled_Specify,
        }),
        new TextboxQuestion({
            key: 'Date_Join_Awome', required: false, order: 40,
            label: 'Date_Join_Awome', value: entrepreneur.Date_Join_Awome,
        }),
        new TextboxQuestion({
            key: 'Responsible_Trainer', required: false, order: 41,
            label: 'Responsible_Trainer', value: entrepreneur.Responsible_Trainer,
        }),
        new TextboxQuestion({
            key: 'Access_Regular_Phone', required: false, order: 40,
            label: 'Access_Regular_Phone', value: entrepreneur.Access_Regular_Phone,
        }),
        new TextboxQuestion({
            key: 'Access_Smart_Phone', required: false, order: 40,
            label: 'Access_Smart_Phone', value: entrepreneur.Access_Smart_Phone,
        }),
        new TextboxQuestion({
            key: 'Access_Computer', required: false, order: 40,
            label: 'Access_Computer', value: entrepreneur.Access_Computer,
        }),
        new TextboxQuestion({
            key: 'Access_Internet', required: false, order: 40,
            label: 'Access_Internet', value: entrepreneur.Access_Internet,
        })];
        return question;

    }
    getTraining(entrepreneur:any) {
        let questions: QuestionBase<any>[] = [new TextboxQuestion({
            key: 'Technical_Training', required: false, order: 42,
            label: 'Technical_Training', value: entrepreneur.Technical_Training,
        }),
        new TextboxQuestion({
            key: 'What_Training', required: false, order: 43,
            label: 'What_Training', value: entrepreneur.What_Training,
        }),         
        new RadioQuestion({key: 'Train_Plan_For_Business', required: false,order: 47,
        label: 'Train_Plan_For_Business', value: entrepreneur.Train_Plan_For_Business}),
        new RadioQuestion({key: 'Train_Record_Keep', required: false,order: 47,
        label: 'Train_Record_Keep', value: entrepreneur.Train_Record_Keep}),
        new RadioQuestion({key: 'Train_Marketing', required: false,order: 47,
        label: 'Train_Marketing', value: entrepreneur.Train_Marketing}),
        new RadioQuestion({key: 'Train_Costing', required: false,order: 47,
        label: 'Train_Costing', value: entrepreneur.Train_Costing}),
        new RadioQuestion({key: 'Train_People_Productivity', required: false,order: 47,
        label: 'Train_People_Productivity', value: entrepreneur.Train_People_Productivity}),
        new RadioQuestion({key: 'Train_Buying_Stock', required: false,order: 47,
        label: 'Train_Buying_Stock', value: entrepreneur.Train_Buying_Stock}),
        new RadioQuestion({key: 'Cost_Labour', required: false,order: 47,
        label: 'Cost_Labour', value: entrepreneur.Cost_Labour}),
        new RadioQuestion({key: 'Cost_Material', required: false,order: 47,
        label: 'Cost_Material', value: entrepreneur.Cost_Material}),
        new RadioQuestion({key: 'Cost_Indireect', required: false,order: 47,
        label: 'Cost_Indireect', value: entrepreneur.Cost_Indireect}),
        new RadioQuestion({key: 'Market_Product', required: false,order: 47,
        label: 'Market_Product', value: entrepreneur.Market_Product}),
        new RadioQuestion({key: 'Market_Price', required: false,order: 47,
        label: 'Market_Price', value: entrepreneur.Market_Price}),
        new RadioQuestion({key: 'Market_Place', required: false,order: 47,
        label: 'Market_Place', value: entrepreneur.Market_Place}),
        new RadioQuestion({key: 'Market_Promotion', required: false,order: 47,
        label: 'Market_Promotion', value: entrepreneur.Market_Promotion}),
        new RadioQuestion({key: 'Benefits_Salary', required: false,order: 47,
        label: 'Benefits_Salary', value: entrepreneur.Benefits_Salary}),
        new RadioQuestion({key: 'Benefits_Other', required: false,order: 47,
        label: 'Benefits_Other', value: entrepreneur.Benefits_Other}),
        new RadioQuestion({key: 'Benefits_Insurance', required: false,order: 47,
        label: 'Benefits_Insurance', value: entrepreneur.Benefits_Insurance}),
        new RadioQuestion({key: 'Benefits_Pension', required: false,order: 47,
        label: 'Benefits_Pension', value: entrepreneur.Benefits_Pension}),
        new RadioQuestion({key: 'Safety_Tools', required: false,order: 47,
        label: 'Safety_Tools', value: entrepreneur.Safety_Tools}),
        new RadioQuestion({key: 'Safety_Clothing', required: false,order: 47,
        label: 'Safety_Clothing', value: entrepreneur.Safety_Clothing}),
        new RadioQuestion({key: 'Safety_Accident', required: false,order: 47,
        label: 'Safety_Accident', value: entrepreneur.Safety_Accident}),
        ];
        return questions;

    }
    getContact(entrepreneur:any){
        let questions:QuestionBase<any>[] = [new TextboxQuestion({
            key: 'Province_ID', required: false,order: 65,
            label: 'Province_ID', value: entrepreneur.Province_ID,
        }),
        new TextboxQuestion({
            key: 'District_Metro_ID', required: false,order: 66,
            label: 'District_Metro_ID', value: entrepreneur.District_Metro_ID,
        }),
        new TextboxQuestion({
            key: 'Municipality_ID', required: false,order: 67,
            label: 'Municipality_ID', value: entrepreneur.Municipality_ID,
        }),
        new TextboxQuestion({
            key: 'Main_Place_ID', required: false,order: 68,
            label: 'Main_Place_ID', value: entrepreneur.Main_Place_ID,
        }),
        new TextboxQuestion({
            key: 'Suburb_ID', required: false,order: 69,
            label: 'Suburb_ID', value: entrepreneur.Suburb_ID,
        }),
        new TextboxQuestion({
            key: 'Ward', required: false,order: 70,
            label: 'Ward', value: entrepreneur.Ward,
        }),
        new TextboxQuestion({
            key: 'Address_Line1', required: false,order: 71,
            label: 'Address_Line1', value: entrepreneur.Address_Line1,
        }),
        new TextboxQuestion({
            key: 'Address_Line2', required: false,order: 72,
            label: 'Address_Line2', value: entrepreneur.Address_Line2,
        }),
        new TextboxQuestion({
            key: 'City', required: false,order: 73,
            label: 'City', value: entrepreneur.City,
        }),
        new TextboxQuestion({
            key: 'Postal_Code', required: false,order: 74,
            label: 'Postal_Code', value: entrepreneur.Postal_Code,
        }),
        new TextboxQuestion({
            key: 'GPS_Latitude', required: false,order: 75,
            label: 'GPS_Latitude', value: entrepreneur.GPS_Latitude,
        }),
        new TextboxQuestion({
            key: 'GPS_Longitude', required: false,order: 76,
            label: 'GPS_Longitude', value: entrepreneur.GPS_Longitude,
        }),
        new TextboxQuestion({
            key: 'Phone', required: false,order: 77,
            label: 'Phone', value: entrepreneur.Phone,
        }),
        new TextboxQuestion({
            key: 'Mobile_Phone', required: false,order: 78,
            label: 'Mobile_Phone', value: entrepreneur.Mobile_Phone,
        }),
        new TextboxQuestion({
            key: 'Email', required: false,order: 79,
            label: 'Email', value: entrepreneur.Email,
        }),
        new TextboxQuestion({
            key: 'Country_ID', required: false,order: 80,
            label: 'Country_ID', value: entrepreneur.Country_ID,
        })];
        return questions;
    }
}
