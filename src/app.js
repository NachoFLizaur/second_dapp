App = {
    loading: false,
    contracts: {},

    load: async () => {
        // Load app...
        console.log("app loading...")

        // Awaits for the functions we need
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // the following code is from the metamask documentation
    // Start Metamask Code
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },
    // End Metamask Code

    // Function to obtain the account connected to the browser
    loadAccount: async () => {
        App.account = web3.eth.accounts[0]
        console.log(App.account)
    },

    // Function to load the smart contract with the Todo List

    loadContract: async () => {
        // Obtain the json of the contract
        const todoList = await $.getJSON('TodoList.json')
        // We create a truffle contract.
        //   A truffle contract is a js representation of a smart contract which will allow us to call functions on it
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)
        console.log(todoList)
        // Assign the contract to a variable with the valies from the blockchain (just like with the console)
        App.todoList = await App.contracts.TodoList.deployed()
    },

    // Render information on the client
    render: async () => {
        // Prevent double rendering
        if (App.loading) {
            return
        }

        // Update app loading state
        App.setLoading(true)

        // Render Metamask account
        $('#account').html(App.account)

        // Render Tasks
        await App.renderTasks()

        // Update app loading state
        App.setLoading(false)

    },

    // Render Tasks on the client
    renderTasks: async () => {
        // Load the total task count from the blockchain (taskCount)
        const taskCount = await App.todoList.taskCount()
        const $taskTemplate = $('.taskTemplate')

        // Render out each task with a new task template
        for (var i = 1; i <= taskCount; i++) {
            // Fetch the task data from the blockchain
            const task = await App.todoList.tasks(i);
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]

            // Create the html for the task
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
            // .on('click', App.toggleCompleted)

            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }

            // Show the task on the client
            $newTaskTemplate.show()
        }

    },

    // Shows or hides the Loading... sentence in the client-side view
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    }

}
$(() => {
    $(window).load(() => {
        App.load()
    })
})