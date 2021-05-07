//BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    };

    var allExpenses = []
    var allIncomes = []

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

})();

//UI CONTROLLER
var UIController = (function () {


    var DOMstrings = {
        inputType: '.add_type',
        description: '.add_description',
        value: '.add_value',
        inputBtn: '.add_btn'

    }
 
    return {
        getInput: function () {
            return {
                input: document.querySelector('.add_type').value, //either inc or exp
                description: document.querySelector('.add_description').value,
                value: document.querySelector('.add_value').value
            };

        },

        getDOMstrings: function () {
           return DOMstrings;
       }
    };


})();


//GLOBAL APP CONTROLLER that links the budget data module and the UI module
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (KeyboardEvent) {
            // console.log(KeyboardEvent);
            if (KeyboardEvent.key === "Enter") {
                ctrlAddItem();
            }        
        })
    }
    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function () {
        //1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        //2. Add the item to the Budget controller

        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the budget on the UI

        // console.log('It works.');
    }
    
    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(budgetController, UIController);  

controller.init();