import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'municipality'
})
export class MunicipalityPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    return value.filter(bob => bob.DistrictMetro_ID==args);
  }


}
