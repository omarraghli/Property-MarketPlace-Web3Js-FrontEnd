import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceObject } from '../Interfaces/BinanceObject';
import { BinanceService } from '../Services/binance.service';
import { ContractService } from '../Services/contract.service';

@Component({
  selector: 'app-current-sells',
  templateUrl: './current-sells.component.html',
  styleUrls: ['./current-sells.component.css']
})
export class CurrentSellsComponent implements OnInit {
  createdItems : Promise<any> = this.fetchCreatedItems();
  BinanceSubscription: Subscription;
  BinanceObject: BinanceObject[];
  interval: any;
  constructor(private contractService: ContractService,
    private binanceService: BinanceService) { }

  ngOnInit(): void {
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

  async fetchCreatedItems(): Promise<any> {
    const Items: any = await this.contractService.fetchItemsCreated();
    console.log('Market Items', Items);
    return Items;
  }

  async cancelMarketSell(itemId : number) : Promise<void> {
    const Items: any = await this.contractService.cancelMarketSell(itemId);
    console.log('Market Items', Items);
    return Items;
  }

}
