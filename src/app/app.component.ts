import { Component, OnInit } from '@angular/core';
import { Address } from 'cluster';
import { ContractService } from './Services/contract.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Front';
  ListingPrice = this.getListingPrice();
  Owner: Promise<any> ;
  account = this.getAccount();
  interval: any;
  currentConnectedAccount : string;

  constructor(private contractService: ContractService) {}
  ngOnInit(): void {
    this.Owner = this.getOwner();
    this.currentConnectedAccount = this.contractService.curretaccount;
  }

  Meta() {
    this.contractService.enableMetaMaskAccount();
  }

  getAccount() {
    this.contractService.LoadAccount();
  }

  async getListingPrice(): Promise<any> {
    const contractService: any = await this.contractService.getListingPrice();
    console.log('ListingPrice', contractService);
    return contractService;
  }

  async getOwner(): Promise<any> {
    const contractServiceOwner: any = await this.contractService.getOwner();
    console.log('Owner', contractServiceOwner);
    return contractServiceOwner;
  }

  async createMarketItem(address, tokenid, price): Promise<any> {
    const createMarketItem: any = await this.contractService.createMarketItem(
      address,
      tokenid,
      price
    );
    console.log('MarketItem', createMarketItem);
    return createMarketItem;
  }
}
