// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Flipper {
    event Flipped(bool result);
    bool public lastFlipResult;

    constructor() {
        lastFlipResult = true;
    }

    function flipCoin() public returns (bool) {
        bytes32 hash = keccak256(abi.encodePacked(block.timestamp, msg.sender, blockhash(block.number - 1)));
        uint256 hashNumber = uint256(hash);

        bool result;
        if (hashNumber % 2 == 0) {
            result = true;
        } else {
            result = false;
        }

        lastFlipResult = result;
        emit Flipped(result);
        return result;
    }

    function getCurrentFlip() public view returns (string memory) {
        return lastFlipResult ? "Heads" : "Tails";
    }
}