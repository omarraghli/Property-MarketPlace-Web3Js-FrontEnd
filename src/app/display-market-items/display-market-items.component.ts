import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceObject } from '../Interfaces/BinanceObject';
import { BinanceService } from '../Services/binance.service';
import { ContractService } from '../Services/contract.service';

@Component({
  selector: 'app-display-market-items',
  templateUrl: './display-market-items.component.html',
  styleUrls: ['./display-market-items.component.css'],
})
export class DisplayMarketItemsComponent implements OnInit {
  MarketItems: any = this.fetchMarketItems();
  BinanceSubscription: Subscription;
  BinanceObject: BinanceObject[];
  interval: any;

  constructor(
    private contractService: ContractService,
    private binanceService: BinanceService
  ) {}
   ngOnInit() {
      this.getEthPrice()
      this.interval = setInterval(() => { 
        this.getEthPrice(); 
    }, 500);
  }

  getEthPrice(){
    this.binanceService
      .getEthPriceFromBinance()
      .subscribe((data) => (this.BinanceObject = data));
  }

  async fetchMarketItems(): Promise<any> {
    const Items: any = await this.contractService.fetchMarketItems();
    console.log('Market Items', Items);
    console.log('MarketSeller', Items[0].seller);
    return Items;
  }
}
