import * as Excel from "exceljs/dist/exceljs.min.js";
import { saveAs } from 'file-saver';
import { forEach } from "@angular/router/src/utils/collection";

export class Report2Excel {

    public createExcel(Header:string[],data:any[]){
        var workbook = new Excel.Workbook();
        workbook.creator = 'Me';
        workbook.lastModifiedBy = 'Her';
        workbook.created = new Date(1985, 8, 30);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2016, 9, 27);

        // Set workbook dates to 1904 date system
        workbook.properties.date1904 = true;
        var sheet = workbook.addWorksheet('My Sheet');
        var worksheet = workbook.getWorksheet('My Sheet');
        // worksheet.columns = [
        // { header: 'Id', key: 'id', width: 10 },
        // { header: 'Name', key: 'name', width: 32 },
        // { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1 }
        // ];
        let colHeader:any[] =[];
        colHeader.push({header:"Value",key:"Value"});
        Header.forEach(d=>{
            colHeader.push({header:d,key:d});
        });
        worksheet.columns = colHeader;
        data.forEach(r=>{
            var rowValues = [];
            rowValues.push(r.name);
            r.data.forEach(s=>{
                rowValues.push(s);
            })
            worksheet.addRow(rowValues);
        }); 
         
        workbook.xlsx.writeBuffer().then(function (data:any) { 
            var blob = new Blob([data], 
                {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}); 
                saveAs(blob, "fileName.xlsx"); 
        });
    }
}