const Migrations = artifacts.require("Migrations");
const NFTMarket = artifacts.require("NFTMarket");
module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(NFTMarket);
};
