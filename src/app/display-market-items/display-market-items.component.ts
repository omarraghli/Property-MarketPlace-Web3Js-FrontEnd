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
  MarketItems: Promise<any> = this.fetchMarketItems();
  BinanceSubscription: Subscription;
  BinanceObject: BinanceObject[];
  interval: any;
  sellerSearchInputeSearch: string;

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

  async fetchMarketItems(): Promise<any> {
    const Items: any = await this.contractService.fetchMarketItems();
    console.log('Market Items', Items);
    return Items;
  }

  createMarketSale(itemId: number, price: number ) {
    this.contractService.createMarketSale(itemId, price);
  }

  async searchBySellerAddress(SellerAddress: string) {
    console.log('befor');
    let SelectedItems: any;
    console.log('after');
    let s: any = await Promise.all(await this.MarketItems);
    let sSelectedItems: any = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i]['seller'] == SellerAddress) {
        sSelectedItems.push(s[i]);
      }
    }

    if (sSelectedItems.length > 0) {
      let tmpPromiss = Promise.resolve(sSelectedItems);
      this.MarketItems = tmpPromiss;
    } else {
      console.log('seller not found');
    }
  }

}
