const Migrations = artifacts.require("Migrations");
const NFTContract = artifacts.require("NFT");
const NFTMarket = artifacts.require("NFTMarket");
module.exports = function (deployer) {
  deployer.deploy(Migrations);

  deployer.deploy(NFTMarket).then(function () {
    return deployer.deploy(NFTContract, NFTMarket.address);
  });
};
