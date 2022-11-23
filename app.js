//selectors
var expenseAmountInput = document.getElementById('expense-amount');
var descriptionInput = document.getElementById('description');
var categoryInput = document.getElementById('category');
var addExpenseBtn = document.getElementById('add-expense');
var expenseList = document.querySelector('.expense-list');

//get all stored expenses in local storage object and display it on page
var expenses = Object.keys(localStorage); //array of keys
//  console.log(expenses)   
expenses.forEach((key) => {
    let expense = localStorage.getItem(key);
    //console.log(expense);
    let expenseDetails = JSON.parse(expense);
    //console.log(expenseDetails)
    addElementsAndButtons(expenseDetails)
});
//expenses.forEach(addElementsAndButtons);

//event listeners
addExpenseBtn.addEventListener('click', addExpense);

//functions
function addExpense(e) {
    e.preventDefault();
    //create expense object
    const amount = expenseAmountInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;

    if(!amount && !description) {   //if no input
        alert("Invalid details!");
    } else {
    const expenseObject = addToArray(amount, description, category);
    localStorage.setItem(amount, JSON.stringify(expenseObject)); //using amount as unique identifier
    addElementsAndButtons(expenseObject);
    }
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
    editBtn.addEventListener('click', editEle);

    //append li to expenseList ul
    expenseList.appendChild(expenseLi)
    
}

function deleteEle(e) {
    const item = e.target.parentNode;
    //console.log(item.childNodes)
    //get child nodes of item
    const children = item.childNodes;
    const expense = parseInt(children[0].innerText.slice(7)); //get expense amount from string
    localStorage.removeItem(expense);   //remove from local storage
    item.remove();  //remove from page
}

function editEle(e) {
    const item = e.target.parentNode;
    const children = item.childNodes;
    const expense = parseInt(children[0].innerText.slice(7));
    const description = children[1].innerText.slice(12);
    const category = children[2].innerText.slice(9);
    console.log(category)

    const expenseAmountInput = document.getElementById('expense-amount');
    expenseAmountInput.value = expense;
    const descriptionInput = document.getElementById('description');
    descriptionInput.value = description
    const categoryInput = document.getElementById('category');
    console.log(categoryInput)
    categoryInput.value = category;
}
