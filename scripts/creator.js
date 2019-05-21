// VARIABLES //
var incomeSourceField, incomeAmountField, incomeSource, incomeAmount, incomeTotalField, incomeTotal;
var incomeList, incomeListTemplate;
var incomeArray;

var expenseSourceField, expenseAmountField, expenseCategoryField, expenseTotalField, expenseSource, expenseAmount, expenseCategory, expenseTotal;
var expenseList, expenseListTempalte;
var expenseArray;

var housingArray, utilitiesArray, transportationArray, foodArray, personalArray, debtArray, otherArray;

// INITIALIZE //
init();

// FUNCTIONS //
function init() {
    incomeSourceField = document.getElementById("income-source");
    incomeAmountField = document.getElementById("income-amount");

    incomeList = document.getElementById("income-list");
    incomeListTemplate = document.getElementById("income-list-item-template");

    incomeTotalField = document.getElementById("income-total");
    incomeTotal = 0;

    incomeArray = [];

    expenseSourceField = document.getElementById("expense-source");
    expenseAmountField = document.getElementById("expense-amount");
    expenseCategoryField = document.getElementById("expense-categories");

    expenseList = document.getElementById("expense-list");
    expenseListTempalte = document.getElementById("expense-list-item-template");

    expenseTotalField = document.getElementById("expense-total");
    expenseTotal = 0;

    expenseArray = [];

    housingArray = [];
    utilitiesArray = [];
    transportationArray = [];
    foodArray = [];
    personalArray = [];
    debtArray = [];
    otherArray = [];
}

function addIncome() {
    
    if(checkIncomeFields()){
        buildIncomeTemplate();
    }

}

function addExpense() {
    if(checkExpenseFields()){
        buildExpenseTemplate();
    }
}

function deleteIncome(button) {
    //Get li ID
    var liID = button.parentNode.id;

    //Remove li from ul
    var listItem = document.getElementById(liID);
    incomeList.removeChild(listItem);

    //Update income total
    var income = incomeArray.filter( function(obj) {
        return obj.id == liID;
    });
    incomeTotal = incomeTotal - income[0].amount;
    incomeTotalField.innerHTML = "Income Total: $" + incomeTotal;

    //Remove item from array. Uses a filter to update the array with anything that doesn't have the same ID
    incomeArray = incomeArray.filter( function(obj) {
        return obj.id != liID;
    });
}

function deleteExpense(button) {
    //Get li ID
    var liID = button.parentNode.id;

    //Remove li from ul
    var listItem = document.getElementById(liID);
    expenseList.removeChild(listItem);

    //Update income total
    var expense = expenseArray.filter( function(obj) {
        return obj.id == liID;
    });
    expenseTotal = expenseTotal - expense[0].amount;
    expenseTotalField.innerHTML = "Expense Total: $" + expenseTotal;

    //Remove item from array. Uses a filter to update the array with anything that doesn't have the same ID
    expenseArray = expenseArray.filter( function(obj) {
        return obj.id != liID;
    });
}

//Checks income input fields to ensure they're filled in correctly
function checkIncomeFields() {
    incomeSource = incomeSourceField.value;
    incomeAmount = incomeAmountField.value;

    if(incomeSource == ""){
        alert("You need to enter an income source. ");
        return false;
    }else
    if(incomeAmount == "") {
        alert("You need to enter an income amount. ");
        return false;
    }else
    if(!incomeAmount.match(/^[0-9]\d*(\.\d+)?$/)){
        alert("The income amount needs to be a number that's greater than 0. ");
        return false;
    }else{
        return true;
    }
}

function checkExpenseFields(){
    expenseSource = expenseSourceField.value;
    expenseAmount = expenseAmountField.value;

    if(expenseSource == ""){
        alert("You need to enter an expense source.");
        return false;
    }else
    if(expenseAmount == "") {
        alert("You need to enter an expense amount.");
        return false;
    }else
    if(!expenseAmount.match(/^[0-9]\d*(\.\d+)?$/)){
        alert("The expense amount needs to be a number that's greater than 0.");
        return false;
    }else
    if(expenseCategoryField.selectedIndex == 0) {
        alert("You need to select a category.");
        return false;
    }
    else{
        return true;
    }

}

//Sets up the list item based on the income list item template
function buildIncomeTemplate() {

    //Clone template
    var newTemplate = incomeListTemplate.content.cloneNode(true);
    var paragraph = newTemplate.querySelector("p")
    var listItem  = newTemplate.querySelector("li");

    //Format income
    incomeAmount = parseFloat(incomeAmount).toFixed(2);

    //Create income object and add to array
    var income = {
        source: incomeSource,
        amount: incomeAmount,
        id: "income_" + incomeArray.length
    }
    incomeArray.push(income);

    //Set the ID
    listItem.setAttribute("id", income.id);

    //Update the nodes in the template
    paragraph.innerHTML = "$" + incomeAmount + " from " + incomeSource;
    incomeList.append(newTemplate);

    //Update total
    incomeTotal = incomeTotal + parseFloat(incomeAmount);
    incomeTotalField.innerHTML = "Income Total: $" + incomeTotal;

    //Clear fields
    incomeAmountField.value = "";
    incomeSourceField.value = "";

}

function buildExpenseTemplate() {
    //Clone template
    var newTemplate = expenseListTempalte.content.cloneNode(true);
    var paragraph = newTemplate.querySelector("p")
    var listItem  = newTemplate.querySelector("li");

    //Format income
    expenseAmount = parseFloat(expenseAmount).toFixed(2);

    //Create income object and add to array
    var expense = {
        source: expenseSource,
        amount: expenseAmount,
        optgroup: expenseCategoryField.options[expenseCategoryField.selectedIndex].parentNode.label, //Gets the optgroup label
        option: expenseCategoryField.value,
        id: "expense_" + expenseArray.length
    }
    expenseArray.push(expense);

    //Set the ID
    listItem.setAttribute("id", expense.id);

    //Update the nodes in the template
    paragraph.innerHTML = "$" + expenseAmount + " from " + expenseSource;
    expenseList.append(newTemplate);

    //Update total
    expenseTotal = expenseTotal + parseFloat(expenseAmount);
    expenseTotalField.innerHTML = "Expense Total: $" + expenseTotal;

    //Clear fields
    expenseAmountField.value = "";
    expenseSourceField.value = "";
    expenseCategoryField.selectedIndex = 0;

}