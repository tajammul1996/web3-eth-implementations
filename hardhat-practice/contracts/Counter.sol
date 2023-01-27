// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Counter {
    uint public count;

    constructor(uint _initialCount) {
        count = _initialCount;
    }

    function increment() external returns(uint) {
        count += 1;
        return count;
    }

    function decrement() external returns(uint) {
        count -= 1;
        return count;
    }
}