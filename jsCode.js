//Define the income object
const income = {

    //array to store income items
    items: [],

    //Method to add an income item to the items array
    addIncome: function(name, amount, recurring) {

        //push the new income item to the items array
        this.items.push({ name, amount, recurring });

        //save the updated items array to session storage
        this.saveToSessionStorage();
    },

    //method to save the items array to session storage
    saveToSessionStorage: function() {

        //convert the items array to JSON and store it in session storage under the key 'income'
        sessionStorage.setItem('income', JSON.stringify(this.items));
    }
};

//define the expenses object
const expenses = {

    //array to store expense items
    items: [],

    //method to add an expense item to the items array
    addExpense: function(name, amount, recurring) {

         //push the new expense item to the items array
         this.items.push({ name, amount, recurring });

         //save the updated items array to session storage
         this.saveToSessionStorage();
    },

    //method to save the items array to session storage
    saveToSessionStorage: function() {

        //convert the items array to JSON and store it in session storage under the key 'expenses'
        sessionStorage.setItem('expenses', JSON.stringify(this.items))
    }
}

//retrieve income items from session storage if available
const savedIncome = sessionStorage.getItem('income');
if (!savedIncome) {

    //add predefined income items only if there are no saved income items
    income.addIncome("Salary", 4000, true);
    income.addIncome("Freelance Work", 1000, true);
    income.addIncome("Investment Dividends", 500, true);
    income.addIncome("Bonus", 200, false);
    income.addIncome("Part-time Job", 600, true);
} else {
    //retrieve and populate income items from local storage
    income.items = JSON.parse(savedIncome);
}

//retrieve expense items from session storage if available
const savedExpenses = sessionStorage.getItem('expenses');
if (!savedExpenses) {

    //add predefined expense items only if there are no saved expense items
    expenses.addExpense("Groceries", 350, true);
    expenses.addExpense("Rent", 1200, true);
    expenses.addExpense("Utilities", 200, true);
    expenses.addExpense("Transportation", 100, true);
    expenses.addExpense("Entertainment", 150, false);
    } else {

    //retrieve and populate expense items from local storage
    expenses.items = JSON.parse(savedExpenses);
}

//prompt user to add more income items
    let incomePrompt = "Income Items:\n";
    income.items.forEach((item, index) => {
        incomePrompt += `${index + 1}. ${item.name}: $${item.amount} (Recurring: ${item.recurring})\n`;
    });
    let addIncome = prompt(incomePrompt + "Do you want to add another income entry? (Enter 'Yes' or 'No')");

    //if user wants to add more income items
    if (addIncome.toLowerCase() === "yes") {
        //prompt user for details of new income item
        let name = prompt("Enter income name:");
        let amount = parseFloat(prompt("Enter income amount:"));
        let recurring = prompt("Is it recurring? (Enter 'Yes' or 'No')").toLowerCase() === "yes";

        //add new income item
        income.addIncome(name, amount, recurring);
}

//prompt user to add more expense items
let expensePrompt = "Expense Items:\n";
expenses.items.forEach((item, index) => {
    expensePrompt += `${index + 1}. ${item.name}: $${item.amount} (Recurring: ${item.recurring})\n`;
});

//if user wants to add more expense items
let addExpense = prompt(expensePrompt + "Do you want to add another expense entry? (Enter 'Yes' or 'No')");
if (addExpense.toLowerCase() === "yes") {
    //prompt user for details of new expense item
    let name = prompt("Enter expense name:");
    let amount = parseFloat(prompt("Enter expense amount:"));
    let recurring = prompt("Is it recurring? (Enter 'Yes' or 'No')").toLowerCase() === "yes";

    //add new expense item
    expenses.addExpense(name, amount, recurring);
}

//calculate total income
let totalIncome = income.items.reduce((total, item) => total + item.amount, 0);

//calculate total expense
let totalExpense = expenses.items.reduce((total, item) => total + item.amount, 0);

//calculate disposable income
let disposableIncome = totalIncome - totalExpense;

//prompt user to specify savings
let savings = parseFloat(prompt(`Your disposable income is $${disposableIncome}. How much would you like to put into savings?`));

//subtract savings from disposable income
disposableIncome -= savings;

//alert user with remaining disposable income
alert(`You have $${disposableIncome} left after putting $${savings} into savings.`);