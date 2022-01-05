import { Component, OnInit } from '@angular/core';
import { ENUM } from 'src/app/Enums/Address';
import { ContractService } from '../Services/contract.service';

@Component({
  selector: 'app-add-item-to-market-place',
  templateUrl: './add-item-to-market-place.component.html',
  styleUrls: ['./add-item-to-market-place.component.css'],
})
export class AddItemToMarketPlaceComponent implements OnInit {
  ContractAddress: string = ENUM.getNFTContractAddress();

  tokenId: number;

  Price: number;
  constructor(private contractService: ContractService) {}

  ngOnInit(): void {}

  addMarketPlaceItem(ContractAdd: string, tokenId: number, price: number) {
    this.contractService.createMarketItem(ContractAdd, tokenId, price);
  }
}
