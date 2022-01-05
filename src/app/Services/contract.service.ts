import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract'; //        ABI FILE      ../../../truffle/build/contracts/NFTMarket.json
import { MetaMaskInpageProvider } from '@metamask/providers';

declare const window: any;
declare let require: any;


const ethereum = window.ethereum as MetaMaskInpageProvider;

let tokenAbi = require('../../../SmartContracts/build/contracts/NFTMarket.json');

let NFTAbi = require('../../../SmartContracts/build/contracts/NFT.json');

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private _web3: any;
  private account: any;
  public curretaccount;
  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this._web3 = window.web3.currentProvider;
      } else {
        this._web3 = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      }
      //this.curretaccount = this._web3.eth.getAccounts()
      console.log('transfer.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('transfer.service :: constructor :: this.web3');
      console.log(this._web3);
      this.curretaccount = this.LoadAccount();
    }
  }

  public async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }


  async getListingPrice() {
    // is displayed not with eth but with wei
    let that = this;
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that._web3);
      paymentContract
        .deployed()
        .then(async function (instance) {
          return resolve(instance.getListingPrice());
        })
        .catch(function (error) {
          console.log(error);
          return reject('Error in getListingPrice service call');
        });
    });
  }

  //create NFT Token
  async CreateNFTToken(propertycontractId: string) {
    let ac = await this.LoadAccount();
    let that = this;
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(NFTAbi);
      paymentContract.setProvider(that._web3);
      paymentContract
        .deployed()
        .then(async function (instance) {
          return resolve(instance.createProprety(ac,propertycontractId,{from : ac}));
        })
        .catch(function (error) {
          console.log(error);
          return reject('Error in Creating NFT Token service call');
        });
    });
  }

  async getOwner() {
    let that = this;
    return new Promise((resolve, reject) => {
      console.log('From', { from: this.account });
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that._web3);
      paymentContract
        .deployed()
        .then(async function (instance) {
          return resolve(instance.getOwner());
        })
        .catch(function (error) {
          console.log(error);
          return reject('Error in getOwner service call');
        });
    });
  }

  async fetchMarketItems() {
    let that = this;
    return new Promise((resolve, reject) => {
      console.log('From', { from: this.account });
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that._web3);
      paymentContract
        .deployed()
        .then(async function (instance) {
          return resolve(instance.fetchMarketItems());
        })
        .catch(function (error) {
          console.log(error);
          return reject('Error in fetchMarketItems service call');
        });
    });
  }

  async LoadAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log('Load Account', accounts);
    this.account = accounts[0];
    console.log('Acccount', this.account);
    return accounts[0];
  }

  async createMarketItem(address, tokenid, price) {
    let LP = await this.getListingPrice();
    let ac = await this.LoadAccount();
    console.log('Load Account :: Create Item', this.account);
    let that = this;
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that._web3);
      paymentContract
        .deployed()
        .then(async function (instance) {
          return resolve(
            instance.createMarketItem(address, tokenid, price, {
              from: ac,
              value: LP,
            })
          );
        })
        .catch(function (error) {
          console.log(error);
          return reject('Error in service call :: createMarketItem');
        });
    });
  }
}
