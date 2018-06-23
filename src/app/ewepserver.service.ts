import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EwepserverService {
  //baseURL = 'http://localhost:81/php-crud-api2/src/index.php/data/'; 
  baseURL = 'http://localhost:81/awome/api.php/data/';
  baseViewURL = 'http://localhost:81/awome/api.php/view/';
  UserLoginObj = new Subject<any>();
  UserLoginObjAnnounced$ = this.UserLoginObj.asObservable();
  Province: any = [];
  Districtmetro: any = [];
  localmunicipality
  constructor(private http: HttpClient) {
    //this._getProvinceLoadLocal();
    //this._getdistrictmetroLoadLocal();
    //this._getlocalmunicipalityLoadLocal();

  }
  getTableData(TableName:string,Options:string){
    return this.http.get<any>(this.baseURL + TableName + (Options===""?"":"?"+Options), httpOptions);
  }
  getRowData(TableName:string,KeyID:string){
    return this.http.get<any>(this.baseURL + TableName + "/"+KeyID, httpOptions);
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
  getEnterprisList(PageNumber: number) {

    return this.http.get<any>(this.baseViewURL + "enterprise_base_view?enterprise?order=Enterprise_ID&page=" + PageNumber, httpOptions);
  }
  getEnterprisItem(EnterprisID: number) {
    return this.http.get<any>(this.baseURL + "enterprise/" + EnterprisID, httpOptions);
  }
}
