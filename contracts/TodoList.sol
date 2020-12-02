// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract TodoList {
    // State variable - It will be written to the blockchain
    // public keyword allows the variable to be accessed by the users in the blockchain
    uint public taskCount = 0;

    // Task data structure
    struct Task{
        uint id;
        string content;
        bool completed;
    }

    // Key value pair mapping (associative array or hash)
    //mapping(key => Value)
    mapping(uint => Task) public tasks;
    
    // Constructor
    constructor() public {
        createTask("This is my first Task!");
    }

    // Function to insert elements on the ToDo list.
    function createTask(string memory _content) public {
        taskCount ++;
        // Init task struct and add it to the tasks[] mapping
        tasks[taskCount] = Task(taskCount, _content, false);
    }

}