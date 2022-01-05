import { Component, OnInit } from '@angular/core';
import { ContractService } from '../Services/contract.service';

@Component({
  selector: 'app-add-item-to-market-place',
  templateUrl: './add-item-to-market-place.component.html',
  styleUrls: ['./add-item-to-market-place.component.css'],
})
export class AddItemToMarketPlaceComponent implements OnInit {
  ContractAddress: string = '0x2c7554190E12cfbDebD5e4525fF33c59c634952A';

  tokenId: number;

  Price: number;
  constructor(private contractSevice: ContractService) {}

  ngOnInit(): void {}

  addMarketPlaceItem(ContractAdd: string, tokenId: number, price: number) {
    this.contractSevice.createMarketItem(ContractAdd, tokenId, price);
  }
}
