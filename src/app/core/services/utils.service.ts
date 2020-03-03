import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( private datePipe: DatePipe){}

  converteData(data: Date) {
    return this.datePipe.transform(data, 'dd-MM-yyyy').toString();
  }

  converteDataComBarra(data: Date) {
    return this.datePipe.transform(data, 'dd/MM/yyyy').toString();
  }


  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODMzMzAxNDMsInVzZXJfbmFtZSI6ImFkbWluQHVtb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0FUVUFMSVpBUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIiwiUk9MRV9BVFVBTElaQVJfQ0FURUdPUklBIiwiUk9MRV9BVFVBTElaQVJfUEVTU09BIl0sImp0aSI6IjkzYzgyYzczLTQ2NTQtNDJlMi04NTBlLTJiNzg4MGUxNjNjOSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.sxhUx55DMRM9nueWswwgIwTwVzTVsq9dxajPFDoukKk'
    })
  }
}
