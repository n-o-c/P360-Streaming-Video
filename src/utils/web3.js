import Web3 from 'web3';

const getWeb3 = async () => {
if (window.ethereum) {
const web3 = new Web3(window.ethereum);
try {
await window.ethereum.enable();
return web3;
} catch (error) {
throw new Error('User denied account access');
}
}
else if (window.web3) {
return new Web3(window.web3.currentProvider);
}
else {
const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_NETWORK_URL);
return new Web3(provider);
}
};

export default getWeb3;
