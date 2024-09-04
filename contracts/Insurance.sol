// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance {
    address public insurer;
    mapping(address => uint256) public claims;

    constructor() {
        insurer = msg.sender;
    }

    function submitClaim(address claimant, uint256 amount) external {
        require(msg.sender == insurer, "Only insurer can submit claims");
        claims[claimant] = amount;
    }

    function approveClaim(address claimant) external {
        require(msg.sender == insurer, "Only insurer can approve claims");
        uint256 amount = claims[claimant];
        payable(claimant).transfer(amount);
        claims[claimant] = 0;
    }
}
