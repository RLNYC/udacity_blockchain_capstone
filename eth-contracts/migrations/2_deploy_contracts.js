// migrating the appropriate contracts
var verifier = artifacts.require("SquareVerifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = async(deployer) => {
  await deployer.deploy(verifier);
  await deployer.deploy(SolnSquareVerifier, verifier.address, "UPROP_ERC721Token", "UPROP721");
};