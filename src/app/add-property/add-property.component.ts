import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractService } from '../Services/contract.service';
import { DataServiceService } from '../Services/data-service.service';
import { JwtClientService } from '../Services/jwt-client.service';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  profileForm = new FormGroup({
    owner: new FormControl(''),
    adresse: new FormControl(''),
    area: new FormControl(''),
    typeOfProprety: new FormControl(''),
    titre: new FormControl(''),
  });
  response: any;
  IdAuthenticated: any;
  PropretyContractIdentifier: string = '';
  propretyType: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: JwtClientService,
    private _DataServiceService: DataServiceService,
    private contractService: ContractService
  ) {}

  ngOnInit() {}
  CreateNFTToken(propertycontractId: string) {
    let isCreated = this.contractService.CreateNFTToken(propertycontractId);
    return isCreated;
  }

  public async onSubmit() {
    console.log('_idAuthenticated', this._DataServiceService._idAuthenticated);
    this.IdAuthenticated = localStorage.getItem('User');
    console.log('this.profileForm before', this.profileForm.value);
    console.log('TITRE', this.profileForm['value']['titre']);
    this.profileForm.patchValue({
      owner: {
        id: this.IdAuthenticated,
      },
    });

    console.log('this.IdAuthenticated', this.IdAuthenticated);
    console.log('this.profileForm after', this.profileForm.value);

    let ifCreated = await this.CreateNFTToken(
      this.profileForm['value']['titre']
    );
    console.log('ifCreatedifCreated', ifCreated);
    if (await ifCreated) {
      let resp = this.service.SaveProperty(
        localStorage.getItem('Token'),
        this.profileForm.value
      );
      resp.subscribe((data) => (this.response = data));
    }
  }

  public AccessIDAuthenticated() {
    this.IdAuthenticated = this.service.idAuthenticated;
    console.warn(this.IdAuthenticated);
  }
}
