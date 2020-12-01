// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract TodoList {
    //State variable - It will be written to the blockchain
    //public keyword allows the variable to be accessed by the users in the blockchain
    uint public taskCount = 0;
}