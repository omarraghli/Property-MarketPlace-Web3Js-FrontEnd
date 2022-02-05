import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceObject } from '../Interfaces/BinanceObject';
import { BinanceService } from '../Services/binance.service';
import { ContractService } from '../Services/contract.service';
import { JwtClientService } from '../Services/jwt-client.service';

@Component({
  selector: 'app-my-propreties',
  templateUrl: './my-propreties.component.html',
  styleUrls: ['./my-propreties.component.css'],
})
export class MyPropretiesComponent implements OnInit {
  myPropreties: Promise<any> = this.fetchMyPropreties();
  BinanceSubscription: Subscription;
  BinanceObject: BinanceObject[];
  interval: any;

  propertiesAddresses: string[] = [];
  propertiesAreas: string[] = [];
  propertiesTypes: string[] = [];

  constructor(
    private binanceService: BinanceService,
    private contractService: ContractService,
    private JWTClientService: JwtClientService
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

  getEthPrice() {
    this.binanceService
      .getEthPriceFromBinance()
      .subscribe((data) => (this.BinanceObject = data));
  }
}
