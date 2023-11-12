class Budget {
    constructor() {
      this.incomeArray = [];
      this.expenseArray = [];
      this.totalSumBudget = 0;
    }
  
    addIncome(description, amount) {
      this.incomeArray.push({ description, amount });
      this.updateBudget();
    }
  
    addExpense(description, amount) {
      this.expenseArray.push({ description, amount: -amount });
      this.updateBudget();
    }
  
    updateBudget() {
      const totalIncome = this.calculateTotal(this.incomeArray);
      const totalExpense = this.calculateTotal(this.expenseArray);
      this.totalSumBudget = totalIncome + totalExpense;
      this.updateUI();
    }
  
    calculateTotal(arr) {
      return arr.reduce((total, item) => total + item.amount, 0);
    }
  
    updateUI() {
        // Update the total income amount
        const totalIncomeAmount = this.calculateTotal(this.incomeArray);
        document.getElementById('totalIncomeAmount').textContent = totalIncomeAmount.toFixed(2);
        
        // Update the total expenses amount
        const totalExpensesAmount = this.calculateTotal(this.expenseArray);
        document.getElementById('totalExpensesAmount').textContent = totalExpensesAmount.toFixed(2);
        
        // Update the total budget amount
        const totalBudgetAmount = totalIncomeAmount + totalExpensesAmount;
        document.getElementById('totalBudgetAmount').textContent = totalBudgetAmount.toFixed(2);
      }
      
  }
  
  // Create an instance of the Budget class
  const budget = new Budget();
  