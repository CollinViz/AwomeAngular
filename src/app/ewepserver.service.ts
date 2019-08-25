import { Injectable, isDevMode } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Observer } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { catchError, retry } from 'rxjs/operators';
import { ASTWithSource } from '@angular/compiler';
import { Options } from './service/question-helper';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EwepserverService {
  // baseURL: string = 'http://awomemis.org/api.php/data/';
  // baseViewURL: string = 'http://awomemis.org/api.php/view/';
  // CoreViewURL: string = 'http://awomemis.org/ajax.php';

  baseURL: string = 'api.php/data/';
  baseViewURL: string = 'api.php/view/';
  CoreViewURL: string = 'ajax.php';
  UploadURL: string = 'upload.php';
  DownloadURL: string = '/upload/';

  SelectedCountryID: number = 1;
  SelectedCurrency: string = "DDDD";
  SelectedUserInfo:any ={};
  SelectedSecurity_Level:string = "View";
  SelectedUserCanEdit:boolean = false;
  SelectedUserCanDelete:boolean = false;
  SelectedUserCanAdd:boolean = false;

  UserLoginObj = new Subject<any>();
  LegalStructure: Options[] = [new Options("Select", "Select"),
  //new Options("Cooperative","Cooperative"),
  new Options("Partnership", "Partnership"),
  new Options("Private Company", "Private Company"),
  new Options("Sole Proprietor", "Sole Proprietor"),
  new Options("Trust", "Trust"),
  new Options("Close Corporation", "Close Corporation"),
  new Options("Not Registered", "Not Registered"),
  new Options("NPO", "NPO"),
  new Options("Other", "Other")];
  CooperativeType: Options[] = [new Options('Select', 'Select'),
  new Options('Primary', 'Primary'),
  new Options('Secondary', 'Secondary'),
  new Options('Tertiary', 'Tertiary')];
  MonthDropDown: Options[] = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).map((item) => new Options(item, item));
  Language: Options[] = ["English", "Afrikaans", "Ndebele", "Sepedi", "SeSotho", "Swati", "Tsonga", "Tswana", "Venda", "Xhosa", "Zulu"].map((item) => new Options(item, item));
  Race: Options[] = ["Black", "White", "Coloured", "Indian", "Asian", "Other"].map((item) => new Options(item, item));
  Sex: Options[] = ["Female", "Male", "Other"].map((item) => new Options(item, item));
  MaritalStatus: Options[] = ["Single", "Married", "Divorced", "Widowed"].map((item) => new Options(item, item));
  EducationLevel: Options[] = ["No Education", "Primary (Gr 1-7)", "Secondary (Gr 8-12)", "Tertiary (Post Matric Certificate, Diploma)", "Degree", "Post Graduate (Honours Degree)"].map((item) => new Options(item, item));
  Assets_TransportTypes: Options[] = ["None", "Car", "Truck", "Van", "Bicycle", "Trailer", "Motorbike"].map((item) => new Options(item, item));
  TheamList: Options[] = ["Default", "Solar", "Slate", "Yeti"].map((item) => new Options(item, item));
  IDorPassport: Options[] = ["ID", "Passport"].map((item) => new Options(item, item));
  Age: Options[] = ["Below 20", "20-29", "30-39", "40-49", "50-59", "60-69", "Over 69"].map((item) => new Options(item, item));
  NoOfChildren: Options[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Over 10"].map((item) => new Options(item, item));
  NoofPeopleHousehold: Options[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Over 10"].map((item) => new Options(item, item));
  NoOfPeopleSupported: Options[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Over 10"].map((item) => new Options(item, item));

  //Sectors: Options[] = ["Agriculture", "Manufacturing", "Retail", "Mining", "Arts n Crafts", "General Servives", "Other"].map((item) => new Options(item, item));
  //SubSectors: Options[] = ["1", "2", "3", "4", "5", "6", "Over 6"].map((item) => new Options(item, item));
  sectors: Sectors[] = [];
  subSectors: SubSectors[] = [];
  Wages: Options[] = ["Below R160/d", "Over R160/d", "Below R2,500", "R2,501-R3,000", "R3,001-R3,500", "Over R3,500"].map((item) => new Options(item, item));
  Income: Options[] = ["R0-R3,000", "R3,001-R6,000", "R6,001-R9,000", "R9,001-R12,000", "R12,001-R15,000", "R15,001-R18,000", "R18,001-R21,000", "Over R21,000"].map((item) => new Options(item, item));
  YearsOperating: Options[] = ["0-3", "4-6", "7-9", "10-12", "13-15", "Over 15"].map((item) => new Options(item, item));

  province: Province[] = [];
  districtMetro: DistrictMetro[] = [];
  localMunicipality: LocalMunicipality[] = [];
  mainPlaces: MainPlace[] = [];
  CountryListStatic: Country[] = [];
  NationalityList: Nationality[] = [];
  ActiveEDFs:any =[];
  ActiveTrainers:any =[];
  //country:Country[] = [];
  private CountryList: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  private showInternetError: BehaviorSubject<InternetConnection> = new BehaviorSubject<InternetConnection>({ UsingInternet: false, progress: 0, StopInternet: false, ErrorMessage: "", DebugErrorMessage: "", HTTPStatus: "" });
  private loginInfomation: BehaviorSubject<LogInData> = new BehaviorSubject<LogInData>({ LoginOK: false, Username: "Bobo", FullName: "", Theme: "Default", Country_ID: 1, Country_Name: "", Currency: "R",Security_Level:"View" });
  private RoutingStashBox: any = null;
  private ActiveEDFsList: BehaviorSubject<EDF[]> = new BehaviorSubject<EDF[]>([]);
  private ActiveTrainersList: BehaviorSubject<EDF[]> = new BehaviorSubject<EDF[]>([]);
  constructor(private http: HttpClient) {
    if (isDevMode()) {

      this.baseURL = 'http://localhost:81/AwomePHP/api.php/data/';

      this.baseViewURL = 'http://localhost:81/AwomePHP/api.php/view/';

      this.CoreViewURL = 'http://localhost:81/AwomePHP/ajax.php';
      this.UploadURL = 'http://localhost:81/AwomePHP/upload.php';
      this.DownloadURL = 'http://localhost:81/AwomePHP/upload/';
    }
    console.log("New Instance created");
    this.SelectedCountryID = 1;
    this._getCountry();
    this._getEDF();
    // this._getProvinceLoadLocal();
    //this._getdistrictmetroLoadLocal();
    //this._getlocalmunicipalityLoadLocal();
    //this._getMainplace();

  }
  getUploadPath(ID:number):string {
    return this.UploadURL+"?ID=" + ID;
  }
  getDownloadPath(ID:number):string {
    return this.DownloadURL+ID+"/";
  }
  get country(): Observable<Country[]> {
    return this.CountryList.asObservable();
  }
  get internetInfo(): Observable<InternetConnection> {
    return this.showInternetError.asObservable();
  }
  get LoginOK(): Observable<LogInData> {
    return this.loginInfomation.asObservable();
  }
  get EDF(): Observable<EDF[]> {
    return this.ActiveEDFsList.asObservable();
  }
  get Trainers(): Observable<EDF[]> {
    return this.ActiveTrainersList.asObservable();
  }
  //get province():Observable<Province[]> {
  //  return this.provinceList.asObservable();
  //}
  //get district():Observable<DistrictMetro[]>{
  //  return this.districtMetroList.asObservable();
  //}
  //get localMunicipality():Observable<LocalMunicipality[]>{
  /// return this.localMunicipalityList.asObservable();
  //}
  //get mainPlaces():Observable<MainPlace[]>{
  //  return this.mainPlacesList.asObservable();
  //}
  
  getViewData(ViewName: string, Options: string = "") {
    return this.http.get<any>(this.baseViewURL + ViewName + (Options === "" ? "" : "?" + Options), httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getTableData(TableName: string, Options: string) {
    return this.http.get<any>(this.baseURL + TableName + (Options === "" ? "" : "?" + Options), httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getRowData(TableName: string, KeyID: string) {
    return this.http.get<any>(this.baseURL + TableName + "/" + KeyID, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  CreateTableData(TableName: string, DataSave: any) {
    return this.http.post<any>(this.baseURL + TableName, DataSave, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateTableData(TableName: string, KeyID: string, DataSave: any) {
    return this.http.put<any>(this.baseURL + TableName + "/" + KeyID, DataSave, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteTableData(TableName: string, KeyID: string) {
    return this.http.delete<any>(this.baseURL + TableName + "/" + KeyID, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private _getProvinceLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "province?order=Province_Name&filter=Country_ID,eq," + this.SelectedCountryID, httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.province = <Province[]>customers.records;
      this._getdistrictmetroLoadLocal();
      this._getlocalmunicipalityLoadLocal();
      this._getMainplace();
      
    });
  }

  private _getSectorsLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "sectors?order=Name", httpOptions).subscribe((customers: any) => {
      console.log("ewep sector records: ", customers.records);
      this.sectors = <Sectors[]>customers.records;
      this._getSubSectorLoadLocal();
      
      
    });
  }
  private _setLanguages(){
    if(this.SelectedCountryID==1){
      this.Language= ["English", "Afrikaans", "Ndebele", "Sepedi", "SeSotho", "Swati", "Tsonga", "Tswana", "Venda", "Xhosa", "Zulu"].map((item) => new Options(item, item));
    }else if(this.SelectedCountryID==2) {
      this.Language= ["English", "Afrikaans", "Ndebele", "Sepedi", "SeSotho", "Swati", "Tsonga", "Tswana", "Venda", "Xhosa", "Zulu"].map((item) => new Options(item, item));
    }else if (this.SelectedCountryID==3){
      this.Language= ["English", "Afrikaans", "German", "Nama/Damara", "Kavango", "Otjiherero", "Khoekhoe", "Oshiwambo", "Kwangali","Setswana", "Silozi", "other"].map((item) => new Options(item, item));
    }

  }
  private _getCountry() {
    //province
    this.http.get<any>(this.baseURL + "country?order=Country_ID&filter=Active,eq,Y", httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.CountryListStatic = <Country[]>customers.records;
      this.CountryList.next(<Country[]>customers.records);
      //this._getProvinceLoadLocal(); 
      this._setLanguages();
      this._getNationality();
    });
  }
  private _getEDF() {
    this.getActiveEDF().subscribe((customers: any) => {
      this.ActiveEDFs = <EDF[]>customers.records;
      this.ActiveEDFsList.next(<EDF[]>customers.records);
    });
    //province
    this.getActiveTrainer().subscribe((customers: any) => { 
      this.ActiveTrainers = <EDF[]>customers.records;
      this.ActiveTrainersList.next(<EDF[]>customers.records);
       
    });
  }
  private _getdistrictmetroLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "districtmetro?order=Province_ID", httpOptions).subscribe((customers: any) => {
      console.log("district: ",customers.records);
      this.districtMetro = <DistrictMetro[]>customers.records;
    });
  }

  private _getSubSectorLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "subsector?order=Sectors_ID", httpOptions).subscribe((customers: any) => {
      console.log("sub-sector: ",customers.records);
      this.subSectors = <SubSectors[]>customers.records;
    });
  }

  private _getlocalmunicipalityLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "localmunicipality?order=DistrictMetro_ID", httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.localMunicipality = <LocalMunicipality[]>customers.records;
    });
  }
  private _getMainplace() {
    //province
    this.http.get<any>(this.baseURL + "mainplace?orderby=LocalMunicipality_ID", httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.mainPlaces = <MainPlace[]>customers.records;
    });
  }
  private _getNationality() {
    //province
    this.http.get<any>(this.baseURL + "nationality?orderby=Nationality", httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.NationalityList = <Nationality[]>customers.records;
    });
  }
  getActiveEDF() {
    return this.http.get<any>(this.baseURL + "edf?filter=Active,eq,Y" + "&filter=Title_ID,eq,11", httpOptions).pipe(
      catchError(this.handleError)
    );

  }

  getActiveTrainer() {
    return this.http.get<any>(this.baseURL + "edf?filter=Active,eq,Y" + "&filter=Title_ID,eq,11", httpOptions).pipe(
      catchError(this.handleError)
    );

  }

  getEnterprisList(PageNumber: number, FilterOptions: string) {

    return this.http.get<any>(this.baseViewURL + "enterprise_base_view?order=Enterprise_ID&page=" + PageNumber +"&filter=Country_ID,eq,"+this.SelectedCountryID  + (FilterOptions === "" ? "" : "&" + FilterOptions), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCooperativeList(PageNumber: number, FilterOptions: string) {

    return this.http.get<any>(this.baseViewURL + "cooperative_base_view?cooperative?order=Cooperative_ID&page=" + PageNumber +"&filter=Country_ID,eq,"+this.SelectedCountryID  + (FilterOptions === "" ? "" : "&" + FilterOptions), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCooperativeVisitList(PageNumber: number, FilterOptions: string) {

    return this.http.get<any>(this.baseViewURL + "cooperative_visits_view?cooperative?order=Cooperative_ID&page=" + PageNumber +"&filter=Country_ID,eq,"+this.SelectedCountryID  + (FilterOptions === "" ? "" : "&" + FilterOptions), httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getEnterprisItem(EnterprisID: number) {
    return this.http.get<any>(this.baseURL + "enterprise/" + EnterprisID, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getCooperativeItem(CooperativeID: number) {
    return this.http.get<any>(this.baseURL + "cooperative/" + CooperativeID, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getCooperativeVisitItem(CooperativeVisitID: number) {
    return this.http.get<any>(this.baseURL + "cooperative_visits/" + CooperativeVisitID, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  checkEntrepreneur(ID_Passport: string,Entrepreneur_ID:number) {
    let strWhere = "filter=ID_Passport,eq," + ID_Passport + "&filter=Country_ID,eq,"+this.SelectedCountryID
    if(Entrepreneur_ID!=-1){
      strWhere+="&filter=Entrepreneur_ID,neq," + Entrepreneur_ID
    }
    return this.http.get<any>(this.baseURL + "entrepreneur?" + strWhere, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  checkEnterprise(Registration_Number: string,Enterprise_ID: number) {
    let strWhere = "filter=Registration_Number,eq," + Registration_Number + "&filter=Country_ID,eq,"+this.SelectedCountryID
    if(Enterprise_ID!=-1){
      strWhere+="&filter=Enterprise_ID,neq," + Enterprise_ID
    }
    return this.http.get<any>(this.baseURL + "enterprise?"+ strWhere, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  checkCooperative(Registration_Number: string,Cooperative_ID:number) {
    let strWhere = "filter=Registration_Number,eq," + Registration_Number + "&filter=Country_ID,eq,"+this.SelectedCountryID
    if(Cooperative_ID!=-1){
      strWhere+="&filter=Cooperative_ID,neq," + Cooperative_ID
    }
    return this.http.get<any>(this.baseURL + "cooperative?" + strWhere, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  checkLogin(UserName: string, Password: string) {
    let login = { __class: 'LoginGUI', __call: 'checkLogin', UserName: UserName, Password: Password };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  setCountryInfo(CountryID: number, CountryName: string,Currency:string) {
     
    this.SelectedUserInfo.Country_ID= CountryID;
    this.SelectedUserInfo.Country_Name= CountryName;
    this.SelectedUserInfo.Currency= Currency;
    this.setUserLogin(this.SelectedUserInfo,this.SelectedUserInfo);
    //Reload all the cashed data
    this._getProvinceLoadLocal(); 
    this._setLanguages();
    this._getSectorsLoadLocal();
  }
  setUserLogin(UserOJB: any, SelectCounter: Country) {
    //Save local data
    this.SelectedUserInfo  = { 
      Name: UserOJB.Name,
      EDF_ID:UserOJB.EDF_ID,
      Surname: UserOJB.Surname, 
      ThemeName: UserOJB.ThemeName,
      Country_ID: SelectCounter.Country_ID,
      Country_Name: SelectCounter.Country_Name,
      Currency: SelectCounter.Currency,
      Security_Level:UserOJB.Security_Level
    };
    this.SelectedCurrency = SelectCounter.Currency;
    this.SelectedCountryID = SelectCounter.Country_ID;
    this.SelectedSecurity_Level = UserOJB.Security_Level;
    //set security
    if(this.SelectedSecurity_Level=="Edit"){
      this.SelectedUserCanAdd=true;
      this.SelectedUserCanDelete = true;
      this.SelectedUserCanEdit = true;
    }
    if(this.SelectedSecurity_Level=="Admin"){
      this.SelectedUserCanAdd=true;
      this.SelectedUserCanDelete = true;
      this.SelectedUserCanEdit = true;
    }
    if(this.SelectedSecurity_Level=="View"){
      this.SelectedUserCanAdd=false;
      this.SelectedUserCanDelete = false;
      this.SelectedUserCanEdit = false;
    }
    //Send to others
    this.loginInfomation.next({
      LoginOK: true,
      Username: UserOJB.Name,
      FullName: UserOJB.Name + "," + UserOJB.Surname,
      Theme: UserOJB.ThemeName,
      Country_ID: SelectCounter.Country_ID,
      Country_Name: SelectCounter.Country_Name,
      Currency: SelectCounter.Currency,
      Security_Level:UserOJB.Security_Level
    });
    this._getProvinceLoadLocal();
    this._setLanguages();
    this._getSectorsLoadLocal();
    console.log("Change Currency " + this.SelectedCurrency);
  }

  deleteAllFinance(Enterprise_ID: number, Enterprise_Visit_ID: any) {
    let login = { __class: 'FinanceGUI', __call: 'deleteFinance', Enterprise_ID: Enterprise_ID, Enterprise_Visit_ID: Enterprise_Visit_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteAllFinanceCooperative(Cooperative_ID: number, Cooperative_Visit_ID: any) {
    let login = { __class: 'FinanceGUI', __call: 'deleteFinanceCooperative', Cooperative_ID: Cooperative_ID, Cooperative_Visit_ID: Cooperative_Visit_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteCooperative(Cooperative_ID: number){
    let login = { __class: 'DBDeleteGUI', __call: 'deleteCooperative', Cooperative_ID: Cooperative_ID,EDF_ID:this.SelectedUserInfo.EDF_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteEnterprise(Enterprise_ID: number){
    let login = { __class: 'DBDeleteGUI', __call: 'deleteEnterprise', Enterprise_ID: Enterprise_ID,EDF_ID:this.SelectedUserInfo.EDF_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteEntrepreneur(Entrepreneur_ID: number){
    let login = { __class: 'DBDeleteGUI', __call: 'deleteEntrepreneur', Entrepreneur_ID: Entrepreneur_ID,EDF_ID:this.SelectedUserInfo.EDF_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteAssociation(Association_ID: number){
    let login = { __class: 'DBDeleteGUI', __call: 'deleteAssociation', Association_ID: Association_ID,EDF_ID:this.SelectedUserInfo.EDF_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteEnterprise_Visits(enterprise_visit_id: number){
    let login = { __class: 'DBDeleteGUI', __call: 'deleteEnterprise_Visits', enterprise_visit_id: enterprise_visit_id,EDF_ID:this.SelectedUserInfo.EDF_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteCooperative_Visits(cooperative_visit_id: number){
    let login = { __class: 'DBDeleteGUI', __call: 'deleteCooperative_Visits', cooperative_visit_id: cooperative_visit_id,EDF_ID:this.SelectedUserInfo.EDF_ID };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  listCountOFentrepreneurAndenterprise() {
    let login = {
      __class: 'ReportsGUI', __call: 'listCountOFentrepreneurAndenterprise',
      Country_ID: this.SelectedCountryID
    };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getSexCount() {
    let login = {
      __class: 'ReportsGUI', __call: 'getSexCount',
      Country_ID: this.SelectedCountryID
    };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  //getAgeByGroup(ProvinceSearch: string, AgeSearch: string, RaceSearch: string, SexSearch: string) {
    getAgeByGroup(SearchObject:any) {
    let login = {
      __class: 'ReportsGUI', __call: 'getAgeByGroup',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch,
      //Age: AgeSearch,
      //Race: RaceSearch,
      //Sex: SexSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getTraining(ProvinceSearch: string) {
    let login = {
      __class: 'ReportsGUI', __call: 'training',
      Country_ID: this.SelectedCountryID,
      Province: ProvinceSearch
    };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getSectors(SearchObject:any) {
    let login = {
      __class: 'ReportsGUI', __call: 'sectors',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  jobs_created_view(SearchObject:any) {
    let login = {
      __class: 'ReportsGUI', __call: 'jobs_created_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  popular_training_view(ProvinceSearch: string) {
    let login = {
      __class: 'ReportsGUI', __call: 'popular_training_view',
      Country_ID: this.SelectedCountryID,
      Province: ProvinceSearch
    };
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  owners_employees_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'owners_employees_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  female_male_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'female_male_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getincome_expense_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'income_expense_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getpremise_ownership_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'premise_ownership_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  assets_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'assets_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  registration_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'registration_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  startup_funds_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'startup_funds_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  sectors_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'sectors_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  loans_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'loans_view',
      Country_ID: this.SelectedCountryID,
      //Province: ProvinceSearch
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  entrepreneur_income_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'entrepreneur_income_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  education_level_view(SearchObject:any) {
    let login = {
      __class: 'ReportsGUI', __call: 'education_level_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  support_received_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'support_received_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  technology_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'technology_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  challenges_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'challenges_view',
      Country_ID: this.SelectedCountryID
    };
    login =  Object.assign({}, login, SearchObject)
    //console.log('Search Age ', AgeSearch);
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  race_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'race_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  sex_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'sex_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  marital_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'marital_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  age_view(SearchObject:any){
    let login = {
      __class: 'ReportsGUI', __call: 'age_view',
      Country_ID: this.SelectedCountryID,
      
    };
    login =  Object.assign({}, login, SearchObject)
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  addToRoutingStashBox(Data: any) {
    this.RoutingStashBox = Data;
  }
  getRoutingStashBox() {
    return this.RoutingStashBox;
  }

  filesUploaded(ID:number){
    let login = {
      __class: 'FileSystem', __call: 'listFile',
      ID: ID, 
    }; 
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  filesDelete(ID:number,FileName:string){
    let login = {
      __class: 'FileSystem', __call: 'deleteFile',
      FileName: FileName, 
      ID: ID
    }; 
    return this.http.post<any>(this.CoreViewURL, login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let newError: InternetConnection = { UsingInternet: false, progress: 0, StopInternet: false, ErrorMessage: "", DebugErrorMessage: "", HTTPStatus: "" };
    if (error.error instanceof ErrorEvent) {
      newError.ErrorMessage = 'An error occurred:', error.error.message;
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      newError.ErrorMessage = `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    //this.showInternetError.next(newError);
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

export interface Province {
  Province_ID: number,
  Province_Name: string,
  Country_ID: number
}
export interface LocalMunicipality {
  LocalMunicipality_ID: number
  DistrictMetro_ID: number,
  Name: string,
  Code: string,
  City: string
}

export interface MainPlace {
  MainPlace_ID: number;
  LocalMunicipality_ID: number;
  Name: string;
  Code: string;
}
export interface DistrictMetro {
  DistrictMetro_ID: number;
  Province_ID: number;
  Name: string;
  Code: string;
}
export interface Country {
  Country_ID: number;
  Country_Code: string;
  Country_Name: string;
  Active: string;
  Currency: string;
}
export interface InternetConnection {
  UsingInternet: boolean;
  progress: number;
  StopInternet: boolean;
  ErrorMessage: string;
  DebugErrorMessage: string;
  HTTPStatus: string;
}
export interface LogInData {
  LoginOK: boolean,
  Username: string,
  FullName: string,
  Theme: string,
  Country_ID: number,
  Country_Name: string,
  Currency: string,
  Security_Level:string
}
export interface Nationality {
  Nationality_ID: number;
  Nationality: string; 
}
export interface EDF {
  EDF_ID: number;
  Name: string; 
  Surname: string; 
  Phone: string; 
  Reports_To_ID: number; 
  UserName: string; 
  Password: string; 
  Gender: string; 
  Province_ID: number; 
  Programme_ID: number; 
  Title_ID: number; 
  Approver_Y_N: string; 
  Email: string; 
  Security_Level: string; 
  Organization: string; 
  Password_Update_Date: string; 
  Active: string; 
  Country_ID: string; 
  ThemeName: string;  
}

export interface Sectors {
  Sectors_ID: number;
  Name: string; 
}

export interface SubSectors {
  SubSector_ID: number;
  Name: string; 
  Sectors_ID: number;
}