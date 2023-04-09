import Web3 from 'web3';
import CreditToken from '../contracts/CreditToken.json';
import NFTSubscription from '../contracts/NFTSubscription.json';
import RewardSystem from '../contracts/RewardSystem.json';

export const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      return web3;
    } catch (error) {
      throw new Error('User denied account access');
    }
  } else if (window.web3) {
    return new Web3(window.web3.currentProvider);
  } else {
    throw new Error('No web3 provider detected');
  }
};

export const getContracts = async web3 => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = CreditToken.networks[networkId];
  const creditToken = new web3.eth.Contract(
    CreditToken.abi,
    deployedNetwork && deployedNetwork.address
  );
  const nftSubscription = new web3.eth.Contract(
    NFTSubscription.abi,
    deployedNetwork && deployedNetwork.address
  );
  const rewardSystem = new web3.eth.Contract(
    RewardSystem.abi,
    deployedNetwork && deployedNetwork.address
  );
  return { creditToken, nftSubscription, rewardSystem };
};
