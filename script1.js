
// assign variables to elements from html page
const incomeDescript = document.getElementById('incomeDescription');
const incomeAmnt = document.getElementById('incomeAmount');
const incomeBtn = document.getElementById('addIncomeBtn');


const expenseName = document.getElementById('expenseDescription');
const expenseAmount = document.getElementById('expenseAmount');
const expenseBtn = document.getElementById('addExpenseBtn');


const totalExp = document.getElementById('totalExpensesAmount');
const totalInc = document.getElementById('totalIncomeAmount');
const totalBud = document.getElementById('totalBudgetAmount'); //review this one


// budget start amount

let totalSumBudget = 0;

// create objects to store income and expenses
// let totalSumBudget = { description: "", amount: 0 };

let incomeArray = []; //  array  to store multiple incomes
let expenseArray = []; // array to store multiple expenses


//REMOVE BELOW IF ABOVE ARRAY WORks
// let incomeObject = { description: "", amount: 0 };
// let expenseObject = { description: "", amount: 0 };


// first function initiate income
incomeBtn.addEventListener('click', clickOutcomeIncome);

function clickOutcomeIncome() {
 const incomedesc = incomeDescription.value;
 const incamount = parseFloat(incomeAmount.value);

 if (incomedesc === "" ) {
  alert('Description required. please enter a description to income')
  document.getElementById('incomeDescription').focus();
  return false;
}
 if (isNaN(incamount)) {
     alert('Please enter a valid income amount.');
     return;
 }

// incomeObject = {description: incomedesc, amount: incamount}
// updateBudget();
// }
// Add income object to the income array
incomeArray.push({ description: incomedesc, amount: incamount });
updateBudget();
}


// second function initiate second function
expenseBtn.addEventListener('click', clickOutcomeExpense);

function clickOutcomeExpense() {
  const expensedesc = expenseDescription.value;
  const expamount = parseFloat(expenseAmount.value);

  if (expensedesc === "" ) {
      alert('Description required. please enter a description to expense')
      document.getElementById('expenseDescription').focus();
      return false;
  }

  if (isNaN(expamount) || expamount <= 0) {
      alert('please enter a valid expense input amount')
      return;
    }

  expenseArray.push({ description: expensedesc, amount: -expamount }); //stire expense as negative
  updateBudget();
  addExpenseList({ description: expensedesc, amount: -expamount }); // update the UI list here
}


//create function that will show expense list in UI
// Math.abs is method that requires an absolute number, will not take NaN and if 0 value is null

function addExpenseList(expense) {
  const expenseList = document.getElementById('expenseList');
  const newExpense = document.createElement('li');
  deleteButton.classList.add('deleteButton'); // *** adding css class to delete button
  newExpense.textContent = `${expense.description}: ${Math.abs(expense.amount).toFixed(2)}`;
  expenseList.appendChild(newExpense);
  newExpense.appendChild(deleteButton);


//    const expenseText = `${expense.description}: ${Math.abs(expense.amount).toFixed(2)}`;
   // Remove the placeholder if it exists
  const placeholder = document.getElementById('placeholderExpense');
  if (placeholder) {
    placeholder.remove();
  }
}


/// Function to create a delete button for an expense item
function createDeleteButton(expense, expenseElement) {
   const deleteButton = document.createElement('button');
   deleteButton.textContent = 'Delete';
   deleteButton.onclick = function () {
       const index = expenseArray.findIndex((item) => item.description === expense.description && item.amount === expense.amount);
       if (index > -1) {
           expenseArray.splice(index, 1);
           expenseElement.remove(); // Remove the expense item from the UI
           updateBudget(); // Update the budget after deletion
       }
   };
   return deleteButton;
}


function addExpenseList(expense) {
   const expenseList = document.getElementById('expenseList');
   const newExpense = document.createElement('li');
   const expenseText = `${expense.description}: ${Math.abs(expense.amount).toFixed(2)}`;


   newExpense.textContent = expenseText;


   // Create a delete button for the expense item and append it
   const deleteButton = createDeleteButton(expense, newExpense);
   newExpense.appendChild(deleteButton);


   expenseList.appendChild(newExpense);


   // Remove the placeholder if it exists
   const placeholder = document.getElementById('placeholderExpense');
   if (placeholder) {
       placeholder.remove();
   }
}


// need to create function to updatebudget to show the UPDATES to UI
// Update the updateBudget function to calculate the total expense using the expenseArray




function updateBudget() {
  // Update the UI for expenses and income
  totalExp.textContent = calculateTotalExpense().toFixed(2); // Use a function to calculate total expenses
  totalInc.textContent = calculateTotalIncome().toFixed(2); // Use a function to calculate total income
   // Calculate the total budget
  totalSumBudget = calculateTotalIncome() + calculateTotalExpense(); // Calculate the total budget
   // Update the UI for the total budget
  totalBud.textContent = totalSumBudget.toFixed(2);
}
 // Add these helper functions to calculate the total expenses and income
 function calculateTotalExpense() {
  return expenseArray.reduce((total, expense) => total + expense.amount, 0);
}
 function calculateTotalIncome() {
  return incomeArray.reduce((total, income) => total + income.amount, 0);
}
