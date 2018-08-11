import { Injectable } from '@angular/core';
import { QuestionBase } from './../../service/question-base'
import { DropdownQuestion } from './../../service/question-dropdown'
import { TextboxQuestion,NumbersQuestion } from './../../service/question-textbox'
import { CheckBoxQuestion } from './../../service/question-checkBox'
import { ToggleQuestion } from './../../service/question-toggle'
import { RadioQuestion } from './../../service/question-radio'
import { MemoQuestion } from './../../service/question-memo'
import { DatePickerQuestion } from './../../service/question-datepicker'
import { Options,CheckBoxOptions } from './../../service/question-helper'
 
import { EwepserverService } from './../../ewepserver.service'


export class FormGroupMapVisitsEnterprise {

    constructor(public ewepServer: EwepserverService) { 
    
    }
    
  getEnterpriseGenralForm(enterprise:any){
	
	let questions: QuestionBase<any>[] = [
		/*new NumbersQuestion({
			key: 'Year_Established', required: true,order: 3,
			label: 'Year Established', value: enterprise.Year_Established,
			min:1981,max:(new Date()).getFullYear()
		}),
		new DropdownQuestion({
			key: 'Legal_Structure',  required: false, order: 4,
			options: this.ewepServer.LegalStructure, 
			label: 'Legal Structure',
			value: enterprise.Legal_Structure,
		}),*/
		new DatePickerQuestion({
			key: 'Visit_Date', required: true,order: 3,
			label: 'Visit Date?', value: enterprise.Visit_Date,
		}),
		new NumbersQuestion({
			key: 'Visit_Year', required: true,order: 4,
			label: 'Data Collected for Year', value: enterprise.Visit_Year,
			max:(new Date()).getFullYear,min:2018
		}),
		new NumbersQuestion({
			key: 'Visit_Quarter', required: true,order: 5,
			label: 'Data Collected for Qtr', value: enterprise.Visit_Quarter,
			max:4,min:1
		}),
		new NumbersQuestion({
			key: 'Visit_Quarter', required: false,order: 6,
			label: 'Members Present', value: enterprise.Visit_Quarter,
			max:1
		}),
		new ToggleQuestion ({
			key: 'Is_Active', required: false,order: 7,
			label: 'Is Cooperative still Active?', value: enterprise.Is_Active,
		}),
		new TextboxQuestion({
			key: 'Deactivated_Reason', required: false,order: 8,
			label: 'Deactivation Reason', value: enterprise.Deactivated_Reason,
			max:50
		}),
		new ToggleQuestion({
			key: 'Registered_Y_N', required: false,order: 9,
			label: 'Registered', value: enterprise.Registered_Y_N,
		}),
		new TextboxQuestion({
			key: 'Registration_Number', required: false,order: 10,
			label: 'Registration_Number', value: enterprise.Registration_Number,
			max:50
		}),
		/*new NumbersQuestion({
			key: 'Female_Owners', required: false,order: 6,
			label: 'No of Female Owners', value: enterprise.Female_Owners,
		}),
		new NumbersQuestion({
			key: 'Male_Owners', required: false,order: 7,
			label: 'No of Male Owners', value: enterprise.Male_Owners,
		}),*/
		new ToggleQuestion ({
			key: 'Location_Same', required: false,order: 11,
			label: 'Is location same as residence?', value: enterprise.Location_Same,
		}),
		new RadioQuestion({
			key: 'Premise_Own', required: false,order: 12,
			label: 'Premise_Own', value: enterprise.Premise_Own,
			options:[new Options("Owned","Owned"),new Options("Rented","Rented"),
					 new Options("Co-Tenant","Co-Tenant"),new Options("Government Premises","Government Premises"),
					 new Options("Home Based","Home Based") ]
		}),
		new ToggleQuestion({
			key: 'Family_Owned',  required: false, order: 13,
			label: 'Is Business Family owned?', value: enterprise.Family_Owned,
		}),
		new ToggleQuestion({
			key: 'Group_Owned', required: false,order: 14,
			label: 'Is Business Group owned?', value: enterprise.Group_Owned,
		}),
		new TextboxQuestion({
			key: 'Contact_Person', required: false,order: 15,
			label: 'Contact Person', value: enterprise.Contact_Person,
		}),
		/*new NumbersQuestion({
			key: 'Year_Started_AWOME', required: false,order: 14,
			label: 'Year started with AWOME', value: enterprise.Year_Started_AWOME,
		}),*/
		new TextboxQuestion({
			key: 'Responsible_Trainer', required: false,order: 16,
			label: 'Responsible Trainer', value: enterprise.Responsible_Trainer,
		}),
		/*new MemoQuestion({
			key: 'Vision', required: false,order: 16,
			label: 'Vision', value: enterprise.Vision,
		}),
		new MemoQuestion({
			key: 'Obstacles', required: false,order: 17,
			label: 'What are you biggest obstacles', value: enterprise.Obstacles,
		})*/
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getEnterpriseEmploeesFormFemale(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new NumbersQuestion({
			key: 'Female_FT_2500', required: false,order: 133,
			label: 'Below R2,500/month', value: enterprise.Female_FT_2500,
		}),
		new NumbersQuestion({
			key: 'Female_FT_3000', required: false,order: 134,
			label: 'R2,501-R3,000/month', value: enterprise.Female_FT_3000,
		}),
		new NumbersQuestion({
			key: 'Female_FT_3500', required: false,order: 135,
			label: 'R3,001-R3,500/month', value: enterprise.Female_FT_3500,
		}),
		new NumbersQuestion({
			key: 'Female_FT_3500_Plus', required: false,order: 136,
			label: 'Above R3,500/month', value: enterprise.Female_FT_3500_Plus,
		})
	];


	return questions.sort((a, b) => a.order - b.order);

  }
  getEnterpriseEmploeesFormMale(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Male_FT_2500', required: false,order: 137,
			label: 'Below R2,500/month', value: enterprise.Male_FT_2500,
		}),
		new NumbersQuestion({
			key: 'Male_FT_3000', required: false,order: 138,
			label: 'R2,501-R3,000/month', value: enterprise.Male_FT_3000,
		}),
		new NumbersQuestion({
			key: 'Male_FT_3500', required: false,order: 139,
			label: 'R3,001-R3,500/month', value: enterprise.Male_FT_3500,
		}),
		new NumbersQuestion({
			key: 'Male_FT_3500_Plus', required: false,order: 140,
			label: 'Above R3,500/month', value: enterprise.Male_FT_3500_Plus,
		})
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getEnterpriseEmploeesFormFeMalePay(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Female_PT_160', required: false,order: 141,
			label: 'Below R160/day', value: enterprise.Female_PT_160,
		}),
		new NumbersQuestion({
			key: 'Female_PT_160_Plus', required: false,order: 142,
			label: 'Above R160/day', value: enterprise.Female_PT_160_Plus,
		})
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getEnterpriseEmploeesFormMalePay(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Male_PT_160', required: false,order: 143,
			label: 'Below R160/day', value: enterprise.Male_PT_160,
		}),
		new NumbersQuestion({
			key: 'Male_PT_160_Plus', required: false,order: 144,
			label: 'Above R160/day', value: enterprise.Male_PT_160_Plus,
		})
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getEnterpriseEmploeesFormAge(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Age_20', required: false,order: 145,
			label: '< 20 Years', value: enterprise.Age_20,
		}),
		new NumbersQuestion({
			key: 'Age_29', required: false,order: 146,
			label: '20-29 Years ', value: enterprise.Age_29,
		}),
		new NumbersQuestion({
			key: 'Age_39', required: false,order: 147,
			label: '30-39 Years ', value: enterprise.Age_39,
		}),
		new NumbersQuestion({
			key: 'Age_49', required: false,order: 148,
			label: '40-49 Years', value: enterprise.Age_49,
		}),
		new NumbersQuestion({
			key: 'Age_59', required: false,order: 149,
			label: '50-59 Years', value: enterprise.Age_59,
		}),
		new NumbersQuestion({
			key: 'Age_69', required: false,order: 150,
			label: '60-69 Years ', value: enterprise.Age_69,
		}),
		new NumbersQuestion({
			key: 'Age_69_Plus', required: false,order: 151,
			label: '> 69 Years', value: enterprise.Age_69_Plus,
		}) 
	];
	return questions.sort((a, b) => a.order - b.order);
  }


  getStatUpFunds(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new CheckBoxQuestion({
			key: 'Source_of_Startup_Funds', required: false,order: 31,
			label: 'Source of Startup Funds', value: enterprise.Funds_Savings,
			options: [
				new CheckBoxOptions("Funds_Savings","Savings",enterprise.Funds_Savings),
				new CheckBoxOptions("Funds_Group","Group",enterprise.Funds_Group),
				new CheckBoxOptions("Funds_Family","Family",enterprise.Funds_Family),
				new CheckBoxOptions("Funds_Grant","Grant",enterprise.Funds_Grant),
				new CheckBoxOptions("Funds_External","External Loans",enterprise.Funds_External),
				new CheckBoxOptions("Funds_Friends","Friends",enterprise.Funds_Friends),
			]
		}),
		new TextboxQuestion({
			key: 'Funds_Other', required: false,order: 37,
			label: 'Source of funds Other', value: enterprise.Funds_Other,
		}),
		new TextboxQuestion({
			key: 'Funds_Specify', required: false,order: 38,
			label: 'Funds_Specify', value: enterprise.Funds_Specify,
		}),new TextboxQuestion({
			key: 'Assets_Land', required: false,order: 25,
			label: 'Assets_Land', value: enterprise.Assets_Land,
		}),
		new CheckBoxQuestion({
			key: 'Other_Available_Assets', required: false,order: 26,
			label: 'Other Available Assets', value: enterprise.Assets_Buildings,
			options: [
				new CheckBoxOptions("Assets_Buildings","Buildings",enterprise.Assets_Buildings),
				new CheckBoxOptions("Assets_Water","Water",enterprise.Assets_Water),
				new CheckBoxOptions("Assets_Machines","Machines",enterprise.Assets_Machines),
				new CheckBoxOptions("Assets_Other","Other",enterprise.Assets_Other),
			]
		}), 
		new TextboxQuestion({
			key: 'Assets_Specify', required: false,order: 30,
			label: 'Assets_Specify', value: enterprise.Assets_Specify,
		}),
		
		new ToggleQuestion({
			key: 'Bank_Account', required: false,order: 40,
			label: 'Bank_Account', value: enterprise.Bank_Account,
		}),
		new NumbersQuestion({
			key: 'Baseline_Monthly_Income', required: false,order: 41,
			label: 'Baseline monthly Income', value: enterprise.Baseline_Monthly_Income,
			currency:true
		}),
		new DropdownQuestion({
			key: 'Frequency_Of_Income', required: false,order: 152,
			label: 'Frequency of income per year', value: enterprise.Frequency_Of_Income,
			options:this.ewepServer.MonthDropDown
		}),
		new NumbersQuestion({
			key: 'Avg_Sales', required: false,order: 63,
			label: 'Avg monthly Income/ Sales', value: enterprise.Avg_Sales,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Other_Income', required: false,order: 64,
			label: 'Other Income (e.g. rent)', value: enterprise.Avg_Other_Income,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Expenditure', required: false,order: 65,
			label: 'Avg monthly Expenses', value: enterprise.Avg_Expenditure,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Indirect_Cost', required: false,order: 153,
			label: 'Avg monthly Indirect Costs', value: enterprise.Avg_Indirect_Cost,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Member_Salaries', required: false,order: 66,
			label: 'Owner Salaries', value: enterprise.Member_Salaries,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Employee_Salaries', required: false,order: 67,
			label: 'Employee Salaries', value: enterprise.Employee_Salaries,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Profit', required: false,order: 68,
			label: 'Surplus (calculated)', value: enterprise.Avg_Profit,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Profit_Invest', required: false,order: 69,
			label: 'What Invested last month', value: enterprise.Profit_Invest,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Profit_Saved', required: false,order: 70,
			label: 'Avg Savings per month', value: enterprise.Avg_Profit_Saved,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Days_Work', required: false,order: 71,
			label: 'Working days/week', value: enterprise.Days_Work,
		}),
		new NumbersQuestion({
			key: 'Week_Hours_Worked', required: false,order: 154,
			label: 'Working hrs/week', value: enterprise.Week_Hours_Worked,
		}),
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getAccessToMarket(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new MemoQuestion({
			key: 'Current_Market', required: false,order: 54,
			label: 'What is your current Market?', value: enterprise.Current_Market,
		}),
		new DropdownQuestion({
			key: 'Has_Market_Expanded', required: false,order: 155,
			label: 'Has your market expanded since last Quarter?', value: enterprise.Has_Market_Expanded,
			options: [new Options("Yes","Yes"),
						new Options("No","No"),
						new Options("Declined","Declined") ]
		}),
		new MemoQuestion({
			key: 'Specify_Decline', required: false,order: 156,
			label: 'If Declined, specify', value: enterprise.Specify_Decline,
		}),
		new MemoQuestion({
			key: 'Steps_Taken_UpMarket', required: false,order: 157,
			label: 'What steps have you taken to increase market', value: enterprise.Steps_Taken_UpMarket,
		}),
		new MemoQuestion({
			key: 'Marketing_Plan_Specify', required: false,order: 158,
			label: 'Do you have a marketing plan for Qtr? ', value: enterprise.Marketing_Plan_Specify,
		}),
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getAccessToTechnicalSkills(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new ToggleQuestion({
			key: 'Training_Qtr', required: false,order: 111,
			label: 'Receive any technical training in last Quarter?', value: enterprise.Training_Qtr,
		}),
		new TextboxQuestion({
			key: 'What_Training', required: false,order: 159,
			label: 'What was the training?', value: enterprise.What_Training,
		}),
		new TextboxQuestion({
			key: 'Who_Traininig', required: false,order: 160,
			label: 'Who provided training', value: enterprise.Who_Traininig,
		}),
		new DatePickerQuestion({
			key: 'When_Training', required: false,order: 161,
			label: 'When was it?', value: enterprise.When_Training,
		}),
		new ToggleQuestion({
			key: 'Training_Free', required: false,order: 162,
			label: 'Was it free?', value: enterprise.Training_Free,
		}),
		new TextboxQuestion({
			key: 'How_Know_Training', required: false,order: 163,
			label: 'How did you know about training', value: enterprise.How_Know_Training,
		}),
		new TextboxQuestion({
			key: 'Technical_Train_Needs', required: false,order: 164,
			label: 'Technical Training needs', value: enterprise.Technical_Train_Needs,
		}),
		new TextboxQuestion({
			key: 'Support_Provided', required: false,order: 165,
			label: 'Support Provided', value: enterprise.Support_Provided,
		}),
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  ///---------------------------------------------------------------------------------------------------------------
  //
  //----------------------------------------------------------------------------------------------------------------
  getEnterpriseDevelopmentForm(enterprise:any){
    //console.log("Data in Discrict ",this.ewepServer.Districtmetro.map(item=> new Options(item.DistrictMetro_ID,item.Name)))
    let questions: QuestionBase<any>[] = [ 
		 
		new TextboxQuestion({
			key: 'SHG_Savings', required: false,order: 42,
			label: 'SHG_Savings', value: enterprise.SHG_Savings,
		}),
		new TextboxQuestion({
			key: 'Money_Source', required: false,order: 43,
			label: 'Money_Source', value: enterprise.Money_Source,
		}),
			new TextboxQuestion({
				key: 'Province_ID', required: false,order: 11,
				label: 'Province_ID', value: enterprise.Province_ID,
			}),
			new TextboxQuestion({
				key: 'District_Metro_ID', required: false,order: 12,
				label: 'District_Metro_ID', value: enterprise.District_Metro_ID,
			}),
			new TextboxQuestion({
				key: 'Municipality_ID', required: false,order: 13,
				label: 'Municipality_ID', value: enterprise.Municipality_ID,
			}),
			new TextboxQuestion({
				key: 'Main_Place_ID', required: false,order: 14,
				label: 'Main_Place_ID', value: enterprise.Main_Place_ID,
			}),
			new TextboxQuestion({
				key: 'Ward', required: false,order: 15,
				label: 'Ward', value: enterprise.Ward,
			}),
			new TextboxQuestion({
				key: 'Address1', required: false,order: 16,
				label: 'Address1', value: enterprise.Address1,
			}),
			new TextboxQuestion({
				key: 'Address2', required: false,order: 17,
				label: 'Address2', value: enterprise.Address2,
			}),
			new TextboxQuestion({
				key: 'Village_Suburb_ID', required: false,order: 18,
				label: 'Village_Suburb_ID', value: enterprise.Village_Suburb_ID,
			}),
			new TextboxQuestion({
				key: 'City', required: false,order: 19,
				label: 'City', value: enterprise.City,
			}),
			new TextboxQuestion({
				key: 'PostalCode', required: false,order: 20,
				label: 'PostalCode', value: enterprise.PostalCode,
			}),
			new TextboxQuestion({
				key: 'GPS_Latitude', required: false,order: 21,
				label: 'GPS_Latitude', value: enterprise.GPS_Latitude,
			}),
			new TextboxQuestion({
				key: 'GPS_Longitude', required: false,order: 22,
				label: 'GPS_Longitude', value: enterprise.GPS_Longitude,
			}),
			new TextboxQuestion({
				key: 'Phone', required: false,order: 23,
				label: 'Phone', value: enterprise.Phone,
			}),
			new TextboxQuestion({
				key: 'Mobile_Phone', required: false,order: 24,
				label: 'Mobile_Phone', value: enterprise.Mobile_Phone,
			}),
			
			
			new TextboxQuestion({
				key: 'Need_Finance', required: false,order: 44,
				label: 'Need_Finance', value: enterprise.Need_Finance,
			}),
			new TextboxQuestion({
				key: 'Apply_Finance', required: false,order: 45,
				label: 'Apply_Finance', value: enterprise.Apply_Finance,
			}),
			new TextboxQuestion({
				key: 'Where_Apply', required: false,order: 46,
				label: 'Where_Apply', value: enterprise.Where_Apply,
			}),
			new TextboxQuestion({
				key: 'Approved', required: false,order: 47,
				label: 'Approved', value: enterprise.Approved,
			}),
			new TextboxQuestion({
				key: 'Reject_Reason', required: false,order: 48,
				label: 'Reject_Reason', value: enterprise.Reject_Reason,
			}),
			new TextboxQuestion({
				key: 'Reject_Specify', required: false,order: 49,
				label: 'Reject_Specify', value: enterprise.Reject_Specify,
			}),
			new TextboxQuestion({
				key: 'How_Much', required: false,order: 50,
				label: 'How_Much', value: enterprise.How_Much,
			}),
			new TextboxQuestion({
				key: 'Started_Repay', required: false,order: 51,
				label: 'Started_Repay', value: enterprise.Started_Repay,
			}),
			new TextboxQuestion({
				key: 'Access_Markets', required: false,order: 52,
				label: 'Access_Markets', value: enterprise.Access_Markets,
			}),
			new TextboxQuestion({
				key: 'Grow_Markets', required: false,order: 53,
				label: 'Grow_Markets', value: enterprise.Grow_Markets,
			}),
			
			new TextboxQuestion({
				key: 'Marketing_Plan', required: false,order: 55,
				label: 'Marketing_Plan', value: enterprise.Marketing_Plan,
			}),
			new TextboxQuestion({
				key: 'HiH_Training', required: false,order: 56,
				label: 'HiH_Training', value: enterprise.HiH_Training,
			}),
			new TextboxQuestion({
				key: 'Enterprise_Size', required: false,order: 57,
				label: 'Enterprise_Size', value: enterprise.Enterprise_Size,
			}),
			new TextboxQuestion({
				key: 'Female_FT', required: false,order: 58,
				label: 'Female_FT', value: enterprise.Female_FT,
			}),
			new TextboxQuestion({
				key: 'Male_FT', required: false,order: 59,
				label: 'Male_FT', value: enterprise.Male_FT,
			}),
			new TextboxQuestion({
				key: 'Female_PT', required: false,order: 60,
				label: 'Female_PT', value: enterprise.Female_PT,
			}),
			new TextboxQuestion({
				key: 'Male_PT', required: false,order: 61,
				label: 'Male_PT', value: enterprise.Male_PT,
			}),
			new TextboxQuestion({
				key: 'Jobs', required: false,order: 62,
				label: 'Jobs', value: enterprise.Jobs,
			}),
			,
			
			
			
			new TextboxQuestion({
				key: 'Main_Customer', required: false,order: 72,
				label: 'Main_Customer', value: enterprise.Main_Customer,
			}),
			new TextboxQuestion({
				key: 'Sec_Agri', required: false,order: 73,
				label: 'Sec_Agri', value: enterprise.Sec_Agri,
			}),
			new TextboxQuestion({
				key: 'Sec_Manu', required: false,order: 74,
				label: 'Sec_Manu', value: enterprise.Sec_Manu,
			}),
			new TextboxQuestion({
				key: 'Sec_Retail', required: false,order: 75,
				label: 'Sec_Retail', value: enterprise.Sec_Retail,
			}),
			new TextboxQuestion({
				key: 'Sec_Minerals', required: false,order: 76,
				label: 'Sec_Minerals', value: enterprise.Sec_Minerals,
			}),
			new TextboxQuestion({
				key: 'Sec_Arts', required: false,order: 77,
				label: 'Sec_Arts', value: enterprise.Sec_Arts,
			}),
			new TextboxQuestion({
				key: 'Sec_General', required: false,order: 78,
				label: 'Sec_General', value: enterprise.Sec_General,
			}),
			new TextboxQuestion({
				key: 'Sec_Other', required: false,order: 79,
				label: 'Sec_Other', value: enterprise.Sec_Other,
			}),
			new TextboxQuestion({
				key: 'Sec_Specify', required: false,order: 80,
				label: 'Sec_Specify', value: enterprise.Sec_Specify,
			}),
			new TextboxQuestion({
				key: 'Agri_Animal', required: false,order: 81,
				label: 'Agri_Animal', value: enterprise.Agri_Animal,
			}),
			new TextboxQuestion({
				key: 'Agri_Farming', required: false,order: 82,
				label: 'Agri_Farming', value: enterprise.Agri_Farming,
			}),
			new TextboxQuestion({
				key: 'Agri_Other', required: false,order: 83,
				label: 'Agri_Other', value: enterprise.Agri_Other,
			}),
			new TextboxQuestion({
				key: 'Agri_Specify', required: false,order: 84,
				label: 'Agri_Specify', value: enterprise.Agri_Specify,
			}),
			new TextboxQuestion({
				key: 'Manu_Chem', required: false,order: 85,
				label: 'Manu_Chem', value: enterprise.Manu_Chem,
			}),
			new TextboxQuestion({
				key: 'Manu_Cloth', required: false,order: 86,
				label: 'Manu_Cloth', value: enterprise.Manu_Cloth,
			}),
			new TextboxQuestion({
				key: 'Manu_Other', required: false,order: 87,
				label: 'Manu_Other', value: enterprise.Manu_Other,
			}),
			new TextboxQuestion({
				key: 'Manu_Specify', required: false,order: 88,
				label: 'Manu_Specify', value: enterprise.Manu_Specify,
			}),
			new TextboxQuestion({
				key: 'Retail_Dealer', required: false,order: 89,
				label: 'Retail_Dealer', value: enterprise.Retail_Dealer,
			}),
			new TextboxQuestion({
				key: 'Retail_Flea', required: false,order: 90,
				label: 'Retail_Flea', value: enterprise.Retail_Flea,
			}),
			new TextboxQuestion({
				key: 'Retail_Foods', required: false,order: 91,
				label: 'Retail_Foods', value: enterprise.Retail_Foods,
			}),
			new TextboxQuestion({
				key: 'Retail_Vendor', required: false,order: 92,
				label: 'Retail_Vendor', value: enterprise.Retail_Vendor,
			}),
			new TextboxQuestion({
				key: 'Retail_X_Border', required: false,order: 93,
				label: 'Retail_X_Border', value: enterprise.Retail_X_Border,
			}),
			new TextboxQuestion({
				key: 'Retail_Other', required: false,order: 94,
				label: 'Retail_Other', value: enterprise.Retail_Other,
			}),
			new TextboxQuestion({
				key: 'Retail_Specify', required: false,order: 95,
				label: 'Retail_Specify', value: enterprise.Retail_Specify,
			}),
			new TextboxQuestion({
				key: 'Mine_Small', required: false,order: 96,
				label: 'Mine_Small', value: enterprise.Mine_Small,
			}),
			new TextboxQuestion({
				key: 'Mine_Other', required: false,order: 97,
				label: 'Mine_Other', value: enterprise.Mine_Other,
			}),
			new TextboxQuestion({
				key: 'Mine_Specify', required: false,order: 98,
				label: 'Mine_Specify', value: enterprise.Mine_Specify,
			}),
			new TextboxQuestion({
				key: 'Arts_Entertain', required: false,order: 99,
				label: 'Arts_Entertain', value: enterprise.Arts_Entertain,
			}),
			new TextboxQuestion({
				key: 'Arts_Pottery', required: false,order: 100,
				label: 'Arts_Pottery', value: enterprise.Arts_Pottery,
			}),
			new TextboxQuestion({
				key: 'Arts_Beadwork', required: false,order: 101,
				label: 'Arts_Beadwork', value: enterprise.Arts_Beadwork,
			}),
			new TextboxQuestion({
				key: 'Arts_Other', required: false,order: 102,
				label: 'Arts_Other', value: enterprise.Arts_Other,
			}),
			new TextboxQuestion({
				key: 'Arts_Specify', required: false,order: 103,
				label: 'Arts_Specify', value: enterprise.Arts_Specify,
			}),
			new TextboxQuestion({
				key: 'GS_Spaza', required: false,order: 104,
				label: 'GS_Spaza', value: enterprise.GS_Spaza,
			}),
			new TextboxQuestion({
				key: 'GS_Transport', required: false,order: 105,
				label: 'GS_Transport', value: enterprise.GS_Transport,
			}),
			new TextboxQuestion({
				key: 'GS_Salon', required: false,order: 106,
				label: 'GS_Salon', value: enterprise.GS_Salon,
			}),
			new TextboxQuestion({
				key: 'GS_Tourism', required: false,order: 107,
				label: 'GS_Tourism', value: enterprise.GS_Tourism,
			}),
			new TextboxQuestion({
				key: 'GS_Creche', required: false,order: 108,
				label: 'GS_Creche', value: enterprise.GS_Creche,
			}),
			new TextboxQuestion({
				key: 'GS_Other', required: false,order: 109,
				label: 'GS_Other', value: enterprise.GS_Other,
			}),
			new TextboxQuestion({
				key: 'GS_Specify', required: false,order: 110,
				label: 'GS_Specify', value: enterprise.GS_Specify,
			}),
			
			new TextboxQuestion({
				key: 'EDF_ID', required: false,order: 112,
				label: 'EDF_ID', value: enterprise.EDF_ID,
			}),
			
			new TextboxQuestion({
				key: 'Market_Other', required: false,order: 114,
				label: 'Market_Other', value: enterprise.Market_Other,
			}),
			new TextboxQuestion({
				key: 'Comments', required: false,order: 115,
				label: 'Comments', value: enterprise.Comments,
			}),
			new TextboxQuestion({
				key: 'Status', required: false,order: 116,
				label: 'Status', value: enterprise.Status,
			}),
			new TextboxQuestion({
				key: 'Approver_ID', required: false,order: 117,
				label: 'Approver_ID', value: enterprise.Approver_ID,
			}),
			new TextboxQuestion({
				key: 'Date_Created', required: false,order: 118,
				label: 'Date_Created', value: enterprise.Date_Created,
			}),
			new TextboxQuestion({
				key: 'Date_Approved', required: false,order: 119,
				label: 'Date_Approved', value: enterprise.Date_Approved,
			}),
			new TextboxQuestion({
				key: 'Date_Request_Deactivated', required: false,order: 120,
				label: 'Date_Request_Deactivated', value: enterprise.Date_Request_Deactivated,
			}),
			new TextboxQuestion({
				key: 'Date_Deactivated', required: false,order: 121,
				label: 'Date_Deactivated', value: enterprise.Date_Deactivated,
			}),
			new TextboxQuestion({
				key: 'Deactivated_Reason', required: false,order: 122,
				label: 'Deactivated_Reason', value: enterprise.Deactivated_Reason,
			}),
			new TextboxQuestion({
				key: 'Is_Active', required: false,order: 123,
				label: 'Is_Active', value: enterprise.Is_Active,
			}),
			
			new TextboxQuestion({
				key: 'Challenge', required: false,order: 125,
				label: 'Challenge', value: enterprise.Challenge,
			}),
			new TextboxQuestion({
				key: 'ME_Period', required: false,order: 126,
				label: 'ME_Period', value: enterprise.ME_Period,
			}),
			new TextboxQuestion({
				key: 'Month_Started_AWOME', required: false,order: 127,
				label: 'Month_Started_AWOME', value: enterprise.Month_Started_AWOME,
			}),
			new TextboxQuestion({
				key: 'Cocacola', required: false,order: 128,
				label: 'Cocacola', value: enterprise.Cocacola,
			}) ,
			
			
			
			
			
			new TextboxQuestion({
				key: 'Manu_Food', required: false,order: 166,
				label: 'Manu_Food', value: enterprise.Manu_Food,
			}) 

    ];

    return questions.sort((a, b) => a.order - b.order);


  }
}
