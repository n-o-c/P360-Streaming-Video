// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTSubscription is ERC721 {
    address public admin;
    uint256 public nextTokenId;

    constructor() ERC721("NFT Subscription", "NFTS") {
        admin = msg.sender;
        nextTokenId = 1;
    }

    function mint(address to) external {
        require(msg.sender == admin, "Only admin can mint NFTs");
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }
}
