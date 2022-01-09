import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public _data:any
  public _idAuthenticated:string
  constructor() { }
  
  addidAuthenticated(data:any){
    this._idAuthenticated=data
  }

  getidAuthenticated(){
    return this._idAuthenticated
  }

  addData(data:any){
      this._data=data  }

  getData():any[]{
    return this._data;
  }    
}
