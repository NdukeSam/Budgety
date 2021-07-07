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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //[1 2 3 4 5 ], next ID = 6
            //if items are deleted
            //[1 2 4 6 8], next ID = 9
            //Last ID = Last ID + 1

            //Create new ID         
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create new item based on 'inc' or 'exp'
            if (type === 'exp') {
                newItem  = new Expense(ID, des, val);
            } else if(type === 'inc'){
                newItem  = new Income(ID, des, val);
            }
            //Push it into the data structure
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },
        testing: function () {
            console.log(data);
        }
    }
})();

//UI CONTROLLER
var UIController = (function () {


    var DOMstrings = {
        inputType: '.add_type',
        inputDescription: '.add_description',
        inputValue: '.add_value',
        inputBtn: '.add_btn',
        incomeContainer: '.income_list',
        expensesContainer: '.expenses_list'

    }
 
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };

        },


        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item d-flex justify-content-between" id="income-%id%"><div class="item_description">%description%</div><div class="right"><div class="item_value">%value%</div><span class="item_delete"><button class="item_delete-btn"><i class="fas fa-backspace"></i></button></span></div></div>'
            } else {
                element = DOMstrings.expensesContainer;
                 html = '<div class="item d-flex justify-content-between" id="expense-%id%"><div class="item_description">%description%</div><div class="right"><div class="item_value">%value%</div><span class="item_percentage">%percentage%</span><span class="item_delete"><button class="item_delete-btn"><i class="fas fa-backspace"></i></button></span></div></div>'
            }
            

            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields:  () => {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array){
                current.value = "";
            });

            fields[0].focus();
            
        },

        getDOMstrings: function() {
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
        var input, newItem

        //1. Get the field input data
        input = UICtrl.getInput();

        //2. Add the item to the Budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        //4. Clear input fields
        UICtrl.clearFields();
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

