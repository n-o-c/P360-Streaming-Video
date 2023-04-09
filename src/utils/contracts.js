import Web3 from 'web3';
import CreditToken from '../contracts/CreditToken.json';
import NFTSubscription from '../contracts/NFTSubscription.json';
import RewardSystem from '../contracts/RewardSystem.json';

const getContracts = async (web3) => {
const networkId = await web3.eth.net.getId();
const deployedNetworks = {
CreditToken: CreditToken.networks[networkId],
NFTSubscription: NFTSubscription.networks[networkId],
RewardSystem: RewardSystem.networks[networkId],
};

const contracts = {
CreditToken: new web3.eth.Contract(CreditToken.abi, deployedNetworks.CreditToken && deployedNetworks.CreditToken.address),
NFTSubscription: new web3.eth.Contract(NFTSubscription.abi, deployedNetworks.NFTSubscription && deployedNetworks.NFTSubscription.address),
RewardSystem: new web3.eth.Contract(RewardSystem.abi, deployedNetworks.RewardSystem && deployedNetworks.RewardSystem.address),
};

return contracts;
};

export default getContracts;
