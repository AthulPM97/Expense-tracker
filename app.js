//selectors
var expenseAmountInput = document.getElementById('expense-amount');
var descriptionInput = document.getElementById('description');
var categoryInput = document.getElementById('category');
var addExpenseBtn = document.getElementById('add-expense');
var expenseList = document.querySelector('.expense-list');

//event listeners
addExpenseBtn.addEventListener('click', addExpense);

//functions
function addExpense(e) {
    e.preventDefault();
    //create expense object
    const amount = expenseAmountInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;

    const object = {
        amount: amount,
        description: description,
        category: category
    };

    localStorage.setItem("expense " + object.amount, JSON.stringify(object));

    //one expense Item is 1 li with 3 text nodes and 2 buttons
    //create list item
    const expenseLi = document.createElement('li');
    expenseLi.className = "expense-item";
    //add text node with expense amount to li
    expenseLi.appendChild(document.createTextNode(object.amount))
    //add text node with category to li    
    expenseLi.appendChild(document.createTextNode(` ${object.category}`));
    //add text node with description to li
    expenseLi.appendChild(document.createTextNode(` ${object.description}`));
    
    //make and append delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = "delete-expense";
    deleteBtn.innerText = "Delete";
    expenseLi.appendChild(deleteBtn);

    //make and append edit button
    const editBtn = document.createElement('button');
    editBtn.className = "edit-expense";
    editBtn.innerText = "Edit";
    expenseLi.appendChild(editBtn);

    //append li to expenseList ul
    expenseList.appendChild(expenseLi)
    
}


