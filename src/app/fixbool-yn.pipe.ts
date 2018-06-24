import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixboolYN'
})
export class FixboolYNPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let strReturn:any = value;
    switch (value) {
      case "":
      case " ":
      case "0":
      case "N":
      strReturn= "N";
        break;
      case "1":
      case "Y":
      strReturn= "Y";
        break;
      default:
      strReturn= value;
        break;
    }
    return strReturn;
  }

}
