import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractService } from '../Services/contract.service';

@Component({
  selector: 'app-add-item-to-market-place',
  templateUrl: './add-item-to-market-place.component.html',
  styleUrls: ['./add-item-to-market-place.component.css'],
})
export class AddItemToMarketPlaceComponent implements OnInit {

  marketItem = new FormGroup({
    Price: new FormControl(''),
    tokenId: new FormControl(''),
  });
  ownerPropretyIds: Promise<any>;
  tokenId: number =0;

  Price: number;
  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.ownerPropretyIds = this.getownerPropretyIds();
  }

  public onSubmit() {
    this.contractService.createMarketItem(this.marketItem['value']['tokenId'], this.marketItem['value']['Price']);
  }

  // addMarketPlaceItem(tokenId: number, price: number) {
  //   this.contractService.createMarketItem(tokenId, price);
  // }

  async getownerPropretyIds() {
    const PropretyIds: any = await this.contractService.getownerPropretyIds();
    let  a :Promise<any>= Promise.all(PropretyIds);
    console.log('PropretyIds',  PropretyIds);
    return PropretyIds;
  }
}
