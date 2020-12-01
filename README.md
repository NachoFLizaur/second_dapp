# second_dapp
ToDo List app built on the Ethereum Blockchain

1. truffle init
2. touch package.json / new-item package.json
3. update package.json
4. npm install - installs all the project dependancies indicated on the package.json file
5. npm audit and npm audit fix to fix incorrectly installed packages

6. We edit the contract and add an initial scafolding to deploy and test it
7. Compile contract

8. Update truffle-config.js with the local ganache blockchain config

9. Generate the migrations/2_deploy_contracts.js file which will manage the deployment of our contracts to the blockchain (like updating the db schema).
    We update the state of the blockchain.
10. Deploy contract to the blockchain (make sure ganache is running duh) with truffle migrate

11. open the truffle console and check that the contract was indeed deployed correctly (await due to the asynchronous nature of the blockchain)
    todoList = await TodoList.deployed()
    todoList to see the full contract
    todoList.address to see the address of the contract
    todoList.taskCount() to check the value of our State variable (returns Big Number 0)
        taskCount = await todoList.taskCount()
        taskCount.toNumber()