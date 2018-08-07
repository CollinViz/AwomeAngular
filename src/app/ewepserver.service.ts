import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError,BehaviorSubject, Observer } from 'rxjs';
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
  baseURL = 'http://awome.ewepmis.co.za/api.php/data/'; 
  //baseURL = 'http://localhost:81/AwomePHP/api.php/data/';
  baseViewURL = 'http://awome.ewepmis.co.za/api.php/view/';
  //baseViewURL = 'http://localhost:81/AwomePHP/api.php/view/';
  CoreViewURL = 'http://awome.ewepmis.co.za/ajax.php';
  //CoreViewURL = 'http://localhost:81/AwomePHP/ajax.php';
  SelectedCountryID:number=1;
  UserLoginObj = new Subject<any>();
  LegalStructure:Options[] = [new Options("Select","Select"),
                              new Options("Cooperative","Cooperative"),
                              new Options("Partnership","Partnership"),
                              new Options("Private Company","Private Company"),
                              new Options("Sole Proprietor","Sole Proprietor"),
                              new Options("Trust","Trust"),
                              new Options("Close Corporation","Close Corporation"),
                              new Options("Not Registered","Not Registered"),
                              new Options("NPO","NPO"),
                              new Options("Other","Other")]; 
  MonthDropDown:Options[] = Array(1,2,3,4,5,6,7,8,9,10,11,12).map((item)=>new Options(item,item));
  Language:Options[] = ["English","Afrikaans","Ndebele","Sepedi","SeSotho","Swati","Tsonga","Tswana","Venda","Xhosa","Zulu"].map((item)=>new Options(item,item));
  Race:Options[] = ["Black","White","Coloured","Indian","Asian","Other"].map((item)=>new Options(item,item));
  Sex:Options[] = ["Female","Male","Other"].map((item)=>new Options(item,item));
  MaritalStatus:Options[] = ["Single","Married","Divorced","Widowed"].map((item)=>new Options(item,item));
  EducationLevel:Options[] = ["No Education","Primary (Gr 1-7)","Secondary (Gr 8-12)","Tertiary (Post Matric Certificate, Diploma)","Post Graduate (Honours Degree)"].map((item)=>new Options(item,item));
  
  

  province: Province[] =[];
  districtMetro:DistrictMetro[] =[];
  localMunicipality: LocalMunicipality[] =[];
  mainPlaces:MainPlace[] =[];
  //country:Country[] = [];
  private CountryList: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  private showInternetError: BehaviorSubject<InternetConnection> = new BehaviorSubject<InternetConnection>({UsingInternet:false,progress:0,StopInternet:false,ErrorMessage:"",DebugErrorMessage:"",HTTPStatus:""} );
  private loginInfomation:BehaviorSubject<LogInData> = new BehaviorSubject<LogInData>({LoginOK:false,Username:""});
  constructor(private http: HttpClient) {
    console.log("New Instance created");
    this.SelectedCountryID=1;
    this._getProvinceLoadLocal();
    this._getdistrictmetroLoadLocal();
    this._getlocalmunicipalityLoadLocal();
    this._getMainplace(); 
    this._getCountry();
  }
  get country():Observable<Country[]> {
    return this.CountryList.asObservable();
  }
  get internetInfo():Observable<InternetConnection>{
    return this.showInternetError.asObservable();
  }
  get LoginOK():Observable<LogInData>{
    return this.loginInfomation.asObservable();
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
  setCountryInfo(CountryID:number,CountryName:string){
    this.SelectedCountryID = CountryID;
    //Reload all the cashed data
    this._getProvinceLoadLocal(); 
  }
  getViewData(ViewName:string,Options:string=""){
    return this.http.get<any>(this.baseViewURL + ViewName + (Options===""?"":"?"+Options), httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getTableData(TableName:string,Options:string){
    return this.http.get<any>(this.baseURL + TableName + (Options===""?"":"?"+Options), httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getRowData(TableName:string,KeyID:string){
    return this.http.get<any>(this.baseURL + TableName + "/"+KeyID, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  CreateTableData(TableName:string,DataSave:any){
    return this.http.post<any>(this.baseURL + TableName,DataSave, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateTableData(TableName:string,KeyID:string,DataSave:any){
    return this.http.put<any>(this.baseURL + TableName+ "/"+KeyID,DataSave, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteTableData(TableName:string,KeyID:string){
    return this.http.delete<any>(this.baseURL + TableName+ "/"+KeyID, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
 
  private _getProvinceLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "province?order=Province_Name&filter=Country_ID,eq," + this.SelectedCountryID, httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.province = <Province[]>customers.records;
    });
  }

  private _getCountry(){
    //province
    this.http.get<any>(this.baseURL + "country?order=Country_ID&filter=Active,eq,Y", httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.CountryList.next(<Country[]>customers.records);
    });
  }
  private _getdistrictmetroLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "districtmetro?order=Province_ID", httpOptions).subscribe((customers: any) => {
      //console.log(customers.records);
      this.districtMetro = <DistrictMetro[]>customers.records;
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
  getActiveEDF() {
    return this.http.get<any>(this.baseURL + "edf?filter=Active,eq,Y", httpOptions).pipe(
      catchError(this.handleError)
    );

  }
  getEnterprisList(PageNumber: number,FilterOptions:string) {

    return this.http.get<any>(this.baseViewURL + "enterprise_base_view?order=Enterprise_ID&page=" + PageNumber + (FilterOptions===""?"":"&" + FilterOptions), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCooperativeList(PageNumber: number,FilterOptions:string) {

    return this.http.get<any>(this.baseViewURL + "cooperative_base_view?cooperative?order=Cooperative_ID&page=" + PageNumber + (FilterOptions===""?"":"&" + FilterOptions), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCooperativeVisitList(PageNumber: number,FilterOptions:string) {

    return this.http.get<any>(this.baseViewURL + "cooperative_visits_view?cooperative?order=Cooperative_ID&page=" + PageNumber + (FilterOptions===""?"":"&" + FilterOptions), httpOptions).pipe(
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
  checkLogin(UserName:string,Password:string){
    let login={__class:'LoginGUI',__call:'checkLogin',UserName:UserName,Password:Password}; 
    return this.http.post<any>(this.CoreViewURL,login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  setUserLogin(UserOJB:any){
    this.loginInfomation.next({LoginOK:true,Username:UserOJB.Name}); 
  }

  deleteAllFinance(Enterprise_ID:number,Enterprise_Visit_ID:any){
    let login={__class:'FinanceGUI',__call:'deleteFinance',Enterprise_ID:Enterprise_ID,Enterprise_Visit_ID:Enterprise_Visit_ID};
    return this.http.post<any>(this.CoreViewURL,login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let newError:InternetConnection = {UsingInternet:false,progress:0,StopInternet:false,ErrorMessage:"",DebugErrorMessage:"",HTTPStatus:""};
    if (error.error instanceof ErrorEvent) {
      newError.ErrorMessage = 'An error occurred:', error.error.message;
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      newError.ErrorMessage =`Backend returned code ${error.status}, ` +
      `body was: ${error.error}`;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    this.showInternetError.next(newError);
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

export interface Province {
  Province_ID:number,
  Province_Name:string,
  Country_ID:number
}
export interface LocalMunicipality{
  LocalMunicipality_ID:number
  DistrictMetro_ID:number,
  Name:string,
  Code:string,
  City:string
}

export interface MainPlace {
  MainPlace_ID:number,
  LocalMunicipality_ID:number,
  Name:string,
  Code:string
}
export interface DistrictMetro{
  DistrictMetro_ID:number,
  Province_ID:number,
  Name:string,
  Code:string
}
export interface Country {
  Country_ID:number;
  Country_Code:string;
  Country_Name:string;
  Active:string
}
export interface InternetConnection {
  UsingInternet:boolean;
  progress:number,
  StopInternet:boolean,
  ErrorMessage:string;
  DebugErrorMessage:string;
  HTTPStatus:string
}
export interface LogInData{
  LoginOK:boolean,
  Username:string
}