import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private datePipe: DatePipe){}

  converteData(data: Date) {
    return this.datePipe.transform(data, 'dd-MM-yyyy').toString();
  }

  converteDataComBarra(data: Date) {
    if(data) return this.datePipe.transform(data, 'dd/MM/yyyy').toString();
    return null;
  }

  converterParaDate(dataString: string){
    let data = null;
    if(dataString){
      let arr: string[] = dataString.split('/')
      data = new Date(parseInt(arr[2]),parseInt(arr[1])-1, parseInt(arr[0]));
    }
    return data;
  }
}
