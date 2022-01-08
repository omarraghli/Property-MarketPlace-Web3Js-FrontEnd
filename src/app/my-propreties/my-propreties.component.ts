import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceObject } from '../Interfaces/BinanceObject';
import { BinanceService } from '../Services/binance.service';
import { ContractService } from '../Services/contract.service';

@Component({
  selector: 'app-my-propreties',
  templateUrl: './my-propreties.component.html',
  styleUrls: ['./my-propreties.component.css'],
})
export class MyPropretiesComponent implements OnInit {
  myPropreties: Promise<any>=this.fetchMyPropreties();;
  BinanceSubscription: Subscription;
  BinanceObject: BinanceObject[];
  interval: any;
  constructor(
    private binanceService: BinanceService,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.getEthPrice();
    this.interval = setInterval(() => {
      this.getEthPrice();
    }, 500);
  }
  async fetchMyPropreties(): Promise<any> {
    const Items: any = await this.contractService.fetchMyPropreties();
    console.log('MyPropreties', Items);
    return Items;
  }

  getEthPrice() {
    this.binanceService
      .getEthPriceFromBinance()
      .subscribe((data) => (this.BinanceObject = data));
  }
}
