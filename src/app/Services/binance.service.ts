import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {BinanceObject} from '../Interfaces/BinanceObject';
@Injectable({
  providedIn: 'root'
})
export class BinanceService {

  constructor(private httpClient: HttpClient) { }

  getEthPriceFromBinance(): Observable<BinanceObject[]>{
    return this.httpClient.get<BinanceObject[]>('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
  }
}
