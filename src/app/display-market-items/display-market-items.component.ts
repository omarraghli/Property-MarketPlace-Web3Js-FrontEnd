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
    //get MarketPlace items
    const Items: any = await this.contractService.fetchMarketItems();
    //fetche items with their properties
    let fetchItemsProperties: any[] = [];
    let s: any = await Promise.all(Items);
    console.log('Market Items', Items);
    for (let i = 0; i < s.length; i++) {
      let currentProperty: any=await this.getPropretyByTokenId(s[i]['itemId']);
      fetchItemsProperties.push(currentProperty)
    }
    console.log("fetchItemsProperties",fetchItemsProperties)
    //getAllPropertiesUniqueString  
    let allItemsUniqueString : string[] = [];
    for (let j = 0; j < fetchItemsProperties.length; j++) {
      //let currentProperty: any=await this.getPropretyByTokenId(s[i]['itemId']);
      allItemsUniqueString.push(fetchItemsProperties[j]['propertycontractId']);
    }
    console.log('allItemsUniqueString', allItemsUniqueString);

    return Items;
  }

  async getPropretyByTokenId(id:number): Promise<any>{
    const property: any = await this.contractService.getPropretyByTokenId(id);
    console.log('the propertyNumber',id," ", property);
    return property;
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
