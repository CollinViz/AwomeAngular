import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
@Pipe({
  name: 'mainPlace',
  pure: false
})
export class MainPlacePipe implements PipeTransform {
  private cachedData: any = null;
  private cachedargs = '';

  constructor(private http: HttpClient) { }

  transform(value: string, args: string): any {
    console.log("transform " + value + " : " + args )
    if (args !== this.cachedargs) {
      this.cachedData = null;
      this.cachedargs = args;
      console.log("Do HTTP Request " + value + " : " + args )
      this.http.get<any>("http://localhost:81/awome/api.php/data/mainplace?orderby=LocalMunicipality_ID&filter=LocalMunicipality_ID,eq," + args).subscribe( result => this.cachedData = result.records );
    }
    return this.cachedData;
  }

}
