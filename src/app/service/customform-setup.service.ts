import { Injectable } from '@angular/core';
import { QuestionBase } from './question-base'
import { DropdownQuestion } from './question-dropdown'
import { TextboxQuestion,NumbersQuestion } from './question-textbox'
import { CheckBoxQuestion } from './question-checkBox'
import { ToggleQuestion } from './question-toggle'
import { RadioQuestion } from './question-radio'
import { MemoQuestion } from './question-memo'
import { DatePickerQuestion } from './question-datepicker'
import { Options,CheckBoxOptions } from './question-helper'
 
import { EwepserverService } from '../ewepserver.service'


@Injectable({
  providedIn: 'root'
})
export class CustomformSetupService {

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
			options: this.ewepServer.LegalStructure, 
			label: 'Legal Structure',
			value: enterprise.Legal_Structure,
		}),
		new ToggleQuestion({
			key: 'Registered_Y_N', required: false,order: 5,
			label: 'Registered', value: enterprise.Registered_Y_N,
		}),
		new TextboxQuestion({
			key: 'Registration_Number', required: false,order: 6,
			label: 'Registration Number', value: enterprise.Registration_Number,
			min:1,max:30
		}),
		new NumbersQuestion({
			key: 'Female_Owners', required: false ,order: 6,
			label: 'No of Female Owners', value: enterprise.Female_Owners,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Male_Owners', required: false,order: 7,
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
			key: 'Year_Started_AWOME', required: false,order: 13,
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
  getEnterpriseEmploeesFormFemale(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new NumbersQuestion({
			key: 'Female_FT_2500', required: false,order: 133,
			label: 'Below R2,500/month', value: enterprise.Female_FT_2500,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Female_FT_3000', required: false,order: 134,
			label: 'R2,501-R3,000/month', value: enterprise.Female_FT_3000,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Female_FT_3500', required: false,order: 135,
			label: 'R3,001-R3,500/month', value: enterprise.Female_FT_3500,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Female_FT_3500_Plus', required: false,order: 136,
			label: 'Above R3,500/month', value: enterprise.Female_FT_3500_Plus,
			min:0,max:20
		})
	];


	return questions.sort((a, b) => a.order - b.order);

  }
  getEnterpriseEmploeesFormMale(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Male_FT_2500', required: false,order: 137,
			label: 'Below R2,500/month', value: enterprise.Male_FT_2500,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Male_FT_3000', required: false,order: 138,
			label: 'R2,501-R3,000/month', value: enterprise.Male_FT_3000,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Male_FT_3500', required: false,order: 139,
			label: 'R3,001-R3,500/month', value: enterprise.Male_FT_3500,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Male_FT_3500_Plus', required: false,order: 140,
			label: 'Above R3,500/month', value: enterprise.Male_FT_3500_Plus,
			min:0,max:20
		})
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getEnterpriseEmploeesFormFeMalePay(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Female_PT_160', required: false,order: 141,
			label: 'Below R160/day', value: enterprise.Female_PT_160,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Female_PT_160_Plus', required: false,order: 142,
			label: 'Above R160/day', value: enterprise.Female_PT_160_Plus,
			min:0,max:20
		})
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getEnterpriseEmploeesFormMalePay(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Male_PT_160', required: false,order: 143,
			label: 'Below R160/day', value: enterprise.Male_PT_160,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Male_PT_160_Plus', required: false,order: 144,
			label: 'Above R160/day', value: enterprise.Male_PT_160_Plus,
			min:0,max:20
		})
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getEnterpriseEmploeesFormAge(enterprise:any){
	let questions: QuestionBase<any>[] = [
		new NumbersQuestion({
			key: 'Age_20', required: false,order: 145,
			label: '< 20 Years', value: enterprise.Age_20,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Age_29', required: false,order: 146,
			label: '20-29 Years ', value: enterprise.Age_29,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Age_39', required: false,order: 147,
			label: '30-39 Years ', value: enterprise.Age_39,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Age_49', required: false,order: 148,
			label: '40-49 Years', value: enterprise.Age_49,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Age_59', required: false,order: 149,
			label: '50-59 Years', value: enterprise.Age_59,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Age_69', required: false,order: 150,
			label: '60-69 Years ', value: enterprise.Age_69,
			min:0,max:20
		}),
		new NumbersQuestion({
			key: 'Age_69_Plus', required: false,order: 151,
			label: '> 69 Years', value: enterprise.Age_69_Plus,
			min:0,max:20
		}) 
	];
	return questions.sort((a, b) => a.order - b.order);
  }


  getStatUpFunds(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new CheckBoxQuestion({
			key: 'Source_of_Startup_Funds', required: false,order: 10,
			label: 'Source of Startup Funds', value: enterprise.Funds_Savings,
			options: [
				new CheckBoxOptions("Funds_Savings","Savings",enterprise.Funds_Savings),
				new CheckBoxOptions("Funds_Group","Group",enterprise.Funds_Group),
				new CheckBoxOptions("Funds_Family","Family",enterprise.Funds_Family),
				new CheckBoxOptions("Funds_Grant","Grant",enterprise.Funds_Grant),
				new CheckBoxOptions("Funds_External","External Loans",enterprise.Funds_External),
				new CheckBoxOptions("Funds_Friends","Friends",enterprise.Funds_Friends),
				new CheckBoxOptions("Funds_Other","Other",enterprise.Funds_Other),
			]
		}),
		new TextboxQuestion({
			key: 'Funds_Specify', required: false,order: 20,
			label: 'Funds Specify', value: enterprise.Funds_Specify,
		}),
		//new CheckBoxQuestion({
		//	key: 'Assets_Land', required: false,order: 25,
	//		label: 'Land', value: enterprise.Assets_Land,
	//	}),
		new CheckBoxQuestion({
			key: 'Other_Available_Assets', required: false,order: 26,
			label: 'Other Available Assets', value: enterprise.Assets_Buildings,
			options:[
				new CheckBoxOptions("Assets_Land","Land",enterprise.Assets_Land),
				new CheckBoxOptions("Assets_Buildings","Buildings",enterprise.Assets_Buildings),
				new CheckBoxOptions("Assets_Water","Water",enterprise.Assets_Water),
				new CheckBoxOptions("Assets_Machines","Machines",enterprise.Assets_Machines),
				new CheckBoxOptions("Assets_Car","Car",enterprise.Assets_Car),
				new CheckBoxOptions("Assets_Truck","Truck",enterprise.Assets_Truck),
				new CheckBoxOptions("Assets_Van","Van",enterprise.Assets_Van),
				new CheckBoxOptions("Assets_Bicycle","Bicycle",enterprise.Assets_Bicycle),
				new CheckBoxOptions("Assets_Motorbike","Motorbike",enterprise.Assets_Motorbike),
				new CheckBoxOptions("Assets_Trailer","Trailer",enterprise.Assets_Trailer),
				new CheckBoxOptions("Assets_Other","Other",enterprise.Assets_Other),
			]
		}), 
		
		new TextboxQuestion({
			key: 'Assets_Specify', required: false,order: 30,
			label: 'Other Available Assets Specify', value: enterprise.Assets_Specify,
		}),
		//new DropdownQuestion({
		//	key: 'Assets_Transport', required: false,order: 35,
		//	label: 'Transportation', value: enterprise.Assets_Transport,
		//	options:this.ewepServer.Assets_TransportTypes
		//}),
		new ToggleQuestion({
			key: 'Bank_Account', required: false,order: 40,
			label: 'Bank Account', value: enterprise.Bank_Account,
		}),
		new DropdownQuestion({
			key: 'Frequency_Of_Income', required: false,order: 50,
			label: 'How many months a year does the business earn an income', value: enterprise.Frequency_Of_Income,
			options:this.ewepServer.MonthDropDown
		}),
		new NumbersQuestion({
			key: 'Avg_Sales', required: false,order: 60,
			label: 'Avg monthly income/sales', value: enterprise.Avg_Sales,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Other_Income', required: false,order: 61,
			label: 'Other Income (e.g. rent)', value: enterprise.Avg_Other_Income,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Expenditure', required: false,order: 62,
			label: 'Avg Monthly Expenses', value: enterprise.Avg_Expenditure,
			currency:true
		}),		 
		new NumbersQuestion({
			key: 'Member_Salaries', required: false,order: 64,
			label: 'Owner Salaries/month', value: enterprise.Member_Salaries,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Employee_Salaries', required: false,order: 67,
			label: 'Employee Salaries/month', value: enterprise.Employee_Salaries,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Avg_Profit', required: false,order: 68,
			label: 'Surplus (calculated)', value: enterprise.Avg_Profit,
			currency:true
		}),
		new NumbersQuestion({
			key: 'Profit_Invest', required: false,order: 69,
			label: 'What was Invested last month', value: enterprise.Profit_Invest,
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
			min:1,max:7
		}),
		new NumbersQuestion({
			key: 'Week_Hours_Worked', required: false,order: 80,
			label: 'Working hours / day', value: enterprise.Week_Hours_Worked,
			min:1,max:168
		}),
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getAccessToMarket(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new MemoQuestion({
			key: 'Current_Market', required: false,order: 54,
			label: 'Where do you sell your Goods / Services', value: enterprise.Current_Market,
		}),
		new NumbersQuestion({
			key: 'Avg_Daily_Customers', required: false,order: 56,
			label: 'Avg Daily Customers Served', value: enterprise.Avg_Daily_Customers,
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
			label: 'Do you have access to adequate technical skills', value: enterprise.Training_Qtr 
			
		}),		 
		new TextboxQuestion({
			key: 'Technical_Train_Needs', required: false,order: 164,
			label: 'Technical Training needs', value: enterprise.Technical_Train_Needs,
		}) 
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getGoodsAndService(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new RadioQuestion({
			key: 'Goods_services', required: false,order: 9,
			label: 'Goods or Services', value: enterprise.Goods_services,
			options:[
				new Options("Goods","Goods"),new Options("Services","Services")
			]
		}), 
		new CheckBoxQuestion({
			key: 'Sector_1', required: false,order: 20,
			label: 'Sector', value: '',
			options: [
				new CheckBoxOptions("Sec_Agri","Agriculture",enterprise.Sec_Agri),
				new CheckBoxOptions("Sec_Manu","Manufacturing",enterprise.Sec_Manu),
				new CheckBoxOptions("Sec_Minerals","Minerals",enterprise.Sec_Minerals),
				new CheckBoxOptions("Sec_Arts","Arts & Crafts ",enterprise.Sec_Arts),
				new CheckBoxOptions("Sec_General","General Services ",enterprise.Sec_General),
				new CheckBoxOptions("Sec_Retail","Retail",enterprise.Sec_Retail),
				new CheckBoxOptions("Sec_Other","Other",enterprise.Sec_Other) ,
			]
		}),
		new TextboxQuestion({
			key: 'Sec_Specify', required: false,order: 30,
			label: 'Other (specify)', value: enterprise.Sec_Specify,
		}), 
		new CheckBoxQuestion({
			key: 'Sector_1_Agriculture', required: false,order: 40,
			label: 'Sub Sector: Agriculture', value: '',
			options: [				
				new CheckBoxOptions("Agri_Farming","Farming",enterprise.Agri_Farming),
				new CheckBoxOptions("Agri_Animal"," Animal Husbandry",enterprise.Agri_Animal),
				new CheckBoxOptions("Agri_Other","Other",enterprise.Agri_Other) 
			]
		}),
		new TextboxQuestion({
			key: 'Agri_Specify', required: false,order: 50,
			label: 'Other (specify)', value: enterprise.Agri_Specify,
		}),
		new CheckBoxQuestion({
			key: 'Sector_1_Manufacturing', required: false,order: 60,
			label: 'Sub Sector: Manufacturing', value: '',
			options: [				
				new CheckBoxOptions("Manu_Chem","Chemicals",enterprise.Manu_Chem),
				new CheckBoxOptions("Manu_Food","Food processing",enterprise.Manu_Food),
				new CheckBoxOptions("Manu_Cloth","Clothing, Footwear, Textiles",enterprise.Manu_Cloth) ,
				new CheckBoxOptions("Manu_Other","Other",enterprise.Manu_Other) 
			]
		}),
		new TextboxQuestion({
			key: 'Manu_Specify', required: false,order: 70,
			label: 'Other (specify)', value: enterprise.Manu_Specify,
		}),
		new CheckBoxQuestion({
			key: 'Sector_1_Retail', required: false,order: 80,
			label: 'Sub Sector: Retail', value: '',
			options: [				
				new CheckBoxOptions("Retail_Dealer","General Dealer",enterprise.Retail_Dealer),
				new CheckBoxOptions("Retail_Flea","Flea Market",enterprise.Retail_Flea),
				new CheckBoxOptions("Retail_Foods","Foods",enterprise.Retail_Foods), 
				new CheckBoxOptions("Retail_Vendor","Vending",enterprise.Retail_Vendor) ,
				new CheckBoxOptions("Retail_X_Border","Cross Border Trading",enterprise.Retail_X_Border) ,
				new CheckBoxOptions("Retail_Other","Other",enterprise.Retail_Other) 
			]
		}),
		new TextboxQuestion({
			key: 'Retail_Specify', required: false,order: 90,
			label: 'Other (specify)', value: enterprise.Retail_Specify,
		}),
		new CheckBoxQuestion({
			key: 'Sector_1_Minerals', required: false,order: 100,
			label: 'Sub Sector: Minerals', value: '',
			options: [				
				new CheckBoxOptions("Mine_Small","Small scale mining",enterprise.Mine_Small),
				new CheckBoxOptions("Mine_Other","Other",enterprise.Mine_Other)  
			]
		}),
		new TextboxQuestion({
			key: 'Mine_Specify', required: false,order: 100,
			label: 'Other (specify)', value: enterprise.Mine_Specify,
		}),
		new CheckBoxQuestion({
			key: 'Sector_1_ArtsAndCrafts', required: false,order: 110,
			label: 'Sub Sector: Arts & Crafts', value: '',
			options: [				
				new CheckBoxOptions("Arts_Entertain","Entertainment",enterprise.Arts_Entertain),
				new CheckBoxOptions("Arts_Pottery","Pottery",enterprise.Arts_Pottery),
				new CheckBoxOptions("Arts_Beadwork","Beadwork",enterprise.Arts_Beadwork),
				new CheckBoxOptions("Arts_Other","Other",enterprise.Arts_Other)  
			]
		}),
		new TextboxQuestion({
			key: 'Arts_Specify', required: false,order: 110,
			label: 'Other (specify)', value: enterprise.Arts_Specify,
		}),
		new CheckBoxQuestion({
			key: 'Sector_1_General', required: false,order: 120,
			label: 'Sub Sector: General Services', value: '',
			options: [				
				new CheckBoxOptions("GS_Spaza","Spaza Shop ",enterprise.GS_Spaza),
				new CheckBoxOptions("GS_Transport","Transport",enterprise.GS_Transport),
				new CheckBoxOptions("GS_Tourism","Tourism",enterprise.GS_Tourism),
				new CheckBoxOptions("GS_Creche","Creche",enterprise.GS_Creche),
				new CheckBoxOptions("GS_Salon","Hair Salon / Beauty",enterprise.GS_Salon),
				new CheckBoxOptions("GS_Other","Other",enterprise.GS_Other)  
			]
		}),
		new TextboxQuestion({
			key: 'GS_Specify', required: false,order: 130,
			label: 'Other (specify)', value: enterprise.GS_Specify,
		}),
	];
	return questions.sort((a, b) => a.order - b.order);
  }
  getContactInfoNonBinding(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new TextboxQuestion({
			key: 'Ward', required: false,order: 10,
			label: 'Ward (number)', value: enterprise.Ward,
		}),
		new TextboxQuestion({
			key: 'Address1', required: true,order: 20,
			label: 'Address 1', value: enterprise.Address1,
			max:50,min:3
		}),
		new TextboxQuestion({
			key: 'Address2', required: false,order: 30,
			label: 'Address 2', value: enterprise.Address2,
		}),
		new TextboxQuestion({
			key: 'Village_Suburb', required: false,order: 40,
			label: 'Village / Suburb', value: enterprise.Village_Suburb
		}),
		new TextboxQuestion({
			key: 'City', required: false,order: 40,
			label: 'City', value: enterprise.City,
		}),
		new NumbersQuestion({
			key: 'PostalCode', required: false,order: 50,
			label: 'Postal Code', value: enterprise.PostalCode,
			max:9999,min:1
		}),
		new TextboxQuestion({
			key: 'Phone', required: true,order: 60,
			label: 'Landline Phone', value: enterprise.Phone,
			max:10,min:1
		}), 
		new TextboxQuestion({
			key: 'Mobile_Phone', required: true,order: 70,
			label: 'Mobile', value: enterprise.Mobile_Phone,
			max:10,min:1
		}),
		new TextboxQuestion({
            key: 'Email', required: false,order: 79,
            label: 'Email', value: enterprise.Email,
        }),
		new NumbersQuestion({
			key: 'GPS_Latitude', required: false,order: 80,
			label: 'GPS Latitude', value: enterprise.GPS_Latitude,
			max:360,min:-360
		}),
		new NumbersQuestion({
			key: 'GPS_Longitude', required: false,order: 90,
			label: 'GPS Longitude', value: enterprise.GPS_Longitude,
			max:360,min:-360
		}) 
		];
	return questions.sort((a, b) => a.order - b.order);
  }
  getContactInfoBinding(enterprise:any){
	let questions: QuestionBase<any>[] = [ 
		new DropdownQuestion({
			key:"Province_ID",required:true,order:10,
			label:"Province",value:enterprise.Province_ID,
			options:this.ewepServer.province.map((value) =>new Options(value.Province_ID,value.Province_Name))
		}),
		new DropdownQuestion({
			key:"District_Metro_ID",required:true,order:10,
			label:"District / Metro",value:enterprise.District_Metro_ID,
			options:this.ewepServer.districtMetro.filter((element)=>{
					return element.Province_ID==enterprise.Province_ID;
			}).map((value)=> new Options(value.DistrictMetro_ID,value.Name))
		}),
		new DropdownQuestion({
			key:"Municipality_ID",required:true,order:10,
			label:"Local Municipality",value:enterprise.Municipality_ID,
			options:this.ewepServer.localMunicipality.filter((element)=>{
					return element.DistrictMetro_ID==enterprise.District_Metro_ID;
			}).map((value)=>new Options(value.LocalMunicipality_ID,value.Name))
		}),
		new DropdownQuestion({
			key:"Main_Place_ID",required:false,order:10,
			label:"Main Place",value:enterprise.Main_Place_ID,
			options:this.ewepServer.mainPlaces.filter((element)=>{
				return element.LocalMunicipality_ID == enterprise.Municipality_ID
			}).map((value)=>new Options(value.MainPlace_ID,value.Name))
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
				key: 'Village_Suburb', required: false,order: 18,
				label: 'Village_Suburb', value: enterprise.Village_Suburb_ID,
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
				key: 'Email', required: false,order: 25,
				label: 'Email', value: enterprise.Email,
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


