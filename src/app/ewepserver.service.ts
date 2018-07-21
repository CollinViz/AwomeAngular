import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError,BehaviorSubject } from 'rxjs';
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
  baseURL = 'http://localhost:81/AwomePHP/api.php/data/'; 
  //baseURL = 'http://localhost:81/php-crud-api2/src/index.php/data/';
  baseViewURL = 'http://localhost:81/AwomePHP/api.php/view/';
  CoreViewURL = 'http://localhost:81/AwomePHP/ajax.php';
 
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
  UserLoginObjAnnounced$ = this.UserLoginObj.asObservable();
  Province: any = [];
  Districtmetro: any[] = [];
  localmunicipality
  constructor(private http: HttpClient) {
    console.log("New Instance created");
    //this._getProvinceLoadLocal();
    this._getdistrictmetroLoadLocal();
    //this._getlocalmunicipalityLoadLocal();
     
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


  getProvince() {
    return this.http.get<any>(this.baseURL + "province?order=Province_Name", httpOptions);
  }
  getDistrictMetro() {
    return this.http.get<any>(this.baseURL + "districtmetro?order=Province_ID", httpOptions);
  }
  getlocalMunicipality() {
    return this.http.get<any>(this.baseURL + "localmunicipality?orderby=DistrictMetro_ID", httpOptions);
  }
  getMainplace(LocalMunicipality_ID: number) {
    return this.http.get<any>(this.baseURL + "mainplace?orderby=LocalMunicipality_ID&filter=LocalMunicipality_ID,eq,"+LocalMunicipality_ID, httpOptions);
  }
  private _getProvinceLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "province?order=Province_Name", httpOptions).subscribe((customers: any) => {
      console.log(customers.records);
      this.Province = [...customers.records];
    });
  }


  private _getdistrictmetroLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "districtmetro?order=Province_ID", httpOptions).subscribe((customers: any) => {
      console.log(customers.records);
      this.Districtmetro = [...customers.records];
    });
  }
  private _getlocalmunicipalityLoadLocal() {
    //province
    this.http.get<any>(this.baseURL + "localmunicipality?order=DistrictMetro_ID", httpOptions).subscribe((customers: any) => {
      console.log(customers.records);
      this.localmunicipality = [...customers.records];
    });
  }
  getActiveEDF() {
    return this.http.get<any>(this.baseURL + "edf?filter=Active,eq,Y", httpOptions);

  }
  getEnterprisList(PageNumber: number,FilterOptions:string) {

    return this.http.get<any>(this.baseViewURL + "enterprise_base_view?enterprise?order=Enterprise_ID&page=" + PageNumber + (FilterOptions===""?"":"&" + FilterOptions), httpOptions);
  }
  getEnterprisItem(EnterprisID: number) {
    return this.http.get<any>(this.baseURL + "enterprise/" + EnterprisID, httpOptions);
  }
  checkLogin(UserName:string,Password:string){
    let login={__class:'LoginGUI',__call:'checkLogin',UserName:UserName,Password:Password}; 
    return this.http.post<any>(this.CoreViewURL,login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  setUserLogin(UserOJB:any){
    this.UserLoginObj.next(UserOJB); 
  }

  deleteAllFinance(Enterprise_ID:number,Enterprise_Visit_ID:any){
    let login={__class:'FinanceGUI',__call:'deleteFinance',Enterprise_ID:Enterprise_ID,Enterprise_Visit_ID:Enterprise_Visit_ID};
    return this.http.post<any>(this.CoreViewURL,login, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
