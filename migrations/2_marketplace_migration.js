const Staking_Pool = artifacts.require("Staking_Pool");


module.exports = function (deployer) {
  deployer.deploy(Staking_Pool);
};
