import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceObject } from '../Interfaces/BinanceObject';
import { BinanceService } from '../Services/binance.service';
import { ContractService } from '../Services/contract.service';
import { JwtClientService } from '../Services/jwt-client.service';

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

  propertiesAddresses: string[] = [];
  propertiesAreas: string[] = [];
  propertiesTypes: string[] = [];

  constructor(
    private contractService: ContractService,
    private binanceService: BinanceService,
    private JWTClientService: JwtClientService
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
    //fetche items with their properties
    let fetchItemsProperties: any[] = [];
    let s: any = await Promise.all(Items);
    console.log('Market Items', Items);
    for (let i = 0; i < s.length; i++) {
      let currentProperty: any = await this.getPropretyByTokenId(
        s[i]['tokenId']
      );
      fetchItemsProperties.push(currentProperty);
    }
    console.log('fetchItemsProperties', fetchItemsProperties);

    //getAllPropertiesUniqueString
    let allItemsUniqueString: string[] = [];
    for (let j = 0; j < fetchItemsProperties.length; j++) {
      allItemsUniqueString.push(fetchItemsProperties[j]['propertycontractId']);
    }
    console.log('allItemsUniqueString', allItemsUniqueString);
    //getType-address-area of properties
    let propertiesAddresses: string[] = [];
    let propertiesAreas: string[] = [];
    let propertiesTypes: string[] = [];
    allItemsUniqueString.forEach((item) => {
      let resp = this.JWTClientService.GetInfoProperty(
        this.JWTClientService.Token,
        item
      );
      resp.subscribe((data) => {
        let responseJsonFormat: any = JSON.parse(data.toString());
        console.log(
          'data getType-address-area of properties',
          responseJsonFormat
        );
        propertiesAddresses.push(responseJsonFormat['adresse']);
        propertiesAreas.push(responseJsonFormat['area']);
        propertiesTypes.push(responseJsonFormat['typeOfProprety']);
      });
      this.propertiesAddresses = propertiesAddresses;
      this.propertiesAreas = propertiesAreas;
      this.propertiesTypes = propertiesTypes;
    });
    console.log('properties areas', propertiesAreas);
    console.log('propertiesAddresses', propertiesAddresses);
    return Items;
  }

  async getPropretyByTokenId(id: number): Promise<any> {
    const property: any = await this.contractService.getPropretyByTokenId(id);
    console.log('the propertyNumber', id, ' ', property);
    return property;
  }
}
