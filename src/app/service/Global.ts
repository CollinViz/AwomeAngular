import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class GlobalService {
    public currencySymbol:string
    constructor() { 
        this.currencySymbol = "R";
    }

}
 