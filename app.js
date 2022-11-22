//selectors
var expenseAmountInput = document.getElementById('expense-amount');
var descriptionInput = document.getElementById('description');
var categoryInput = document.getElementById('category');
var addExpenseBtn = document.getElementById('add-expense');
var expenseList = document.querySelector('.expense-list');

//get all stored expenses and display it on page
var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
expenses.forEach(addElementsAndButtons);

//event listeners
addExpenseBtn.addEventListener('click', addExpense);

//functions
function addExpense(e) {
    e.preventDefault();
    //create expense object
    const amount = expenseAmountInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;
    
    const expenseObject = addToArray(amount, description, category);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    addElementsAndButtons(expenseObject);
    
}

function addToArray(amount, description, category) {
    if(amount && description && category)
    expenses.push({
        amount,
        description,
        category
    });

    return {amount, description, category};
}


function addElementsAndButtons({amount, description, category}) {
    //one expense Item is 1 li with 3 <p> tags and 2 buttons
    //create list item
    const expenseLi = document.createElement('li');
    expenseLi.className = "expense-item";
    //amount text node
    const amountNode = document.createElement('p');
    amountNode.innerText = "Amount: " + amount;
    //description text node
    const descriptionNode = document.createElement('p');
    descriptionNode.innerText = "Description: " + description;
    //category text node
    const categoryNode = document.createElement('p');
    categoryNode.innerText = "Category: " + category;
    //append to expenseLI
    expenseLi.append(amountNode, descriptionNode, categoryNode);
    
    
    //make and append delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = "delete-expense";
    deleteBtn.innerText = "Delete";
    expenseLi.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteEle);

    //make and append edit button
    const editBtn = document.createElement('button');
    editBtn.className = "edit-expense";
    editBtn.innerText = "Edit";
    expenseLi.appendChild(editBtn);

    //append li to expenseList ul
    expenseList.appendChild(expenseLi)
    
}

function deleteEle(e) {
    console.log(expenses);
    const btn = e.target.parentNode;
    console.log(btn)
    btn.remove();
}


