// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CreditToken is ERC20 {
    address public admin;

    constructor() ERC20("Credit Token", "CT") {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint tokens");
        _mint(to, amount);
    }
}
