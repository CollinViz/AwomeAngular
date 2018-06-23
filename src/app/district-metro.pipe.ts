import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'districtMetro'
})
export class DistrictMetroPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    return value.filter(bob => bob.Province_ID==args);
  }

}
