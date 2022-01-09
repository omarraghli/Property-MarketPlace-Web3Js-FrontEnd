import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceObject } from '../Interfaces/BinanceObject';
import { BinanceService } from '../Services/binance.service';
import { ContractService } from '../Services/contract.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css'],
})
export class AllTransactionsComponent implements OnInit {
  allTransactions: Promise<any> = this.displayAllTransactions();
  BinanceSubscription: Subscription;
  BinanceObject: BinanceObject[];
  interval: any;
  constructor(
    private contractService: ContractService,
    private binanceService: BinanceService
  ) {}

  ngOnInit() {
    this.getEthPrice();
    this.interval = setInterval(() => {
      this.getEthPrice();
    }, 500);
  }
  getEthPrice() {
    this.binanceService
      .getEthPriceFromBinance()
      .subscribe((data) => (this.BinanceObject = data));
  }
  async displayAllTransactions(): Promise<any> {
    const Items: any = await this.contractService.displayAllTransactions();
    console.log('All transactions', Items);
    return Items;
  }
}
