// VARIABLES //
var incomeSourceField, incomeAmountField, incomeSource, incomeAmount, incomeTotalField, incomeTotal;
var incomeList, incomeListTemplate;
var incomeArray;

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
}

function addIncome() {
    
    if(checkIncomeFields()){
        buildIncomeTemplate();
    }

}

function deleteIncome(button) {
    //Get li ID
    var liID = button.parentNode.id;

    //Remove li from ul
    var listItem = document.getElementById(liID);
    incomeList.removeChild(listItem);

    //Remove item from array. Uses a filter to update the array with anything that doesn't have the same ID
    incomeArray = incomeArray.filter( function(obj) {
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
    incomeTotalField.innerHTML = "Income Total: $" + incomeAmount;

    //Clear fields
    incomeAmountField.value = "";
    incomeSourceField.value = "";

}