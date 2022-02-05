import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinanceObject } from '../Interfaces/BinanceObject';
import { BinanceService } from '../Services/binance.service';
import { ContractService } from '../Services/contract.service';
import { JwtClientService } from '../Services/jwt-client.service';

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
  response: any;

  propertiesAddresses: string[] = [];
  propertiesAreas: string[] = [];
  propertiesTypes: string[] = [];
  allItemsTitre: string[] = [];

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

  async fetchMarketItems(): Promise<any> {
    //get MarketPlace items
    const Items: any = await this.contractService.fetchMarketItems();
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
    this.allItemsTitre = allItemsUniqueString;

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

  async createMarketSale(
    itemId: number,
    price: number,
    sellerAddress: string,
    titre: string
  ) {
    let currentAccount = await this.contractService.LoadAccount();
    let propertyId: string;
    console.log('Recipie ACCOUUUnT', currentAccount);
    let recepie = this.contractService.createMarketSale(itemId, price);
    let property: any = this.JWTClientService.getPropertyByTitre(
      localStorage.getItem('Token'),
      titre
    );
    property.subscribe(async (data) => {
      let JsonFormatData = JSON.parse(data);
      let id = JsonFormatData.id;
      propertyId = id;
    });

    if (await recepie) {
      let resp = this.JWTClientService.saveContrat(
        localStorage.getItem('Token'),
        {
          seller: sellerAddress,
          buyer: currentAccount,
          prix: price,
          bienImmobilier: {
            id: propertyId,
          },
        }
      );
      resp.subscribe((data) => {
        this.response = data;
        console.log('dataaaaaa', data);
      });

      this.MarketItems = this.fetchMarketItems();
    }
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
