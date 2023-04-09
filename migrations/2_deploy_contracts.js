const CreditToken = artifacts.require("CreditToken");
const RewardSystem = artifacts.require("RewardSystem");
const NFTSubscription = artifacts.require("NFTSubscription");

module.exports = async function (deployer, network, accounts) {
  // Deploy CreditToken contract
  await deployer.deploy(CreditToken);
  const creditToken = await CreditToken.deployed();

  // Deploy RewardSystem contract and set the CreditToken contract address
  await deployer.deploy(RewardSystem, creditToken.address);
  const rewardSystem = await RewardSystem.deployed();
  await creditToken.transferOwnership(rewardSystem.address);

  // Deploy NFTSubscription contract and set the RewardSystem contract address
  await deployer.deploy(NFTSubscription, rewardSystem.address);
  const nftSubscription = await NFTSubscription.deployed();
  await rewardSystem.setNFTContractAddress(nftSubscription.address);
};
