import { Component, OnInit } from '@angular/core';
import { ContractService } from '../Services/contract.service';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  PropretyContractIdentifier: string = '';
  propretyType: string = '';
  constructor(private contractService: ContractService) {}

  ngOnInit(): void {}
  CreateNFTToken(propertycontractId: string) {
    this.contractService.CreateNFTToken(propertycontractId);
  }
}
