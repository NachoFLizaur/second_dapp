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

12. Further develop the contract, we created a constructor, a createTask function to add new tasks, and a Struct datatype which defines the different data elements of the task.
13. We compile and deploy the contract with truffle migrate --reset (even if the vsc autocorrect implies it is not necessary to add public visibility to the contract, the compiler returned an error if I didn't).
14. We list out the list items and play arround a little bit:
        todolist = await TodoList.deployed()
        todolist.address (returns '0x85F54F2077475C27C78F682CD04c777f6DBD0a34')

        We cannot iterate the mapping as we would do with an array as there is no way of knowing when it ends.
        We must reference each individual task one by one (we can use the taskCount var to know how many we have)

        (await todolist.taskCount()).toNumber() to check its value
        num_of_tasks = await todolist.taskCount() to save it as a variable (it is not a number)

        todolist.tasks(1)

        Returns:

        Result {
            '0': BN {
                negative: 0,
                words: [ 1, <1 empty item> ],
                length: 1,
                red: null
            },
            '1': 'This is my first Task!',
            '2': false,
            id: BN {
                negative: 0,
                words: [ 1, <1 empty item> ],
                length: 1,
                red: null
            },
            content: 'This is my first Task!',
            completed: false
            }
        
        task = await todolist.tasks(1) (saves it to a variable)
        task.id, task.content & task.complete accesses each of its attributes.

15. Generate new files for client side app
        mkdir src
        new-item src/index.html
        new-item src/app.js
        new-item bs-config.json

The web3 js library allows us to connect to the blockchain, read and write data from the blockchain inside the app and metamask allows us to communicate with that clientside app with web3 js and allow us to interact with it via our browser.

loadWeb3 is out "Blockchain connection"

16. start up metamask and connect to our ganache blockchain with the account with which we deployed the contract (usually the first one).
17. Configure App.js file (comments of the file)
18. Test that the app really works! (don't forget to initialize the lite-server)