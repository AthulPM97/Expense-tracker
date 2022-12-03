//selectors
var expenseAmountInput = document.getElementById('expense-amount');
var descriptionInput = document.getElementById('description');
var categoryInput = document.getElementById('category');
var addExpenseBtn = document.getElementById('add-expense');
var expenseList = document.querySelector('.expense-list');

//get all stored expenses from crudcrud and display it on page

document.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/ac0ff283c3b2478b9a504228642336f7/expenses')
    .then((response) => {
        const expenses = response.data;
        expenses.forEach((expense) => {
            addElementsAndButtons(expense);
        })
    })
    .catch(err => console.log(err));
});

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
        const expenseObject = {amount, description, category};
        //localStorage.setItem(amount, JSON.stringify(expenseObject)); //using amount as unique identifier
        axios.post('https://crudcrud.com/api/ac0ff283c3b2478b9a504228642336f7/expenses',
        expenseObject)
        .then((response) => {
            console.log(response.data);
            addElementsAndButtons(response.data);
        })
        .catch((err) => console.log(err));
    }
}

function addElementsAndButtons(expense) {
    //one expense Item is 1 li with 3 <p> tags and 2 buttons
    //create list item
    const expenseLi = document.createElement('li');
    expenseLi.className = "expense-item";
    //amount text node
    const amountNode = document.createElement('p');
    amountNode.innerText = "Amount: " + expense.amount;
    //description text node
    const descriptionNode = document.createElement('p');
    descriptionNode.innerText = "Description: " + expense.description;
    //category text node
    const categoryNode = document.createElement('p');
    categoryNode.innerText = "Category: " + expense.category;
    //append to expenseLI
    expenseLi.append(amountNode, descriptionNode, categoryNode);
    
    //make and append delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = "delete-expense";
    deleteBtn.innerText = "Delete";
    expenseLi.appendChild(deleteBtn);
    //delete event
    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentNode;
        axios.delete(`https://crudcrud.com/api/ac0ff283c3b2478b9a504228642336f7/expenses/${expense._id}`);  
        //remove from page
        item.remove();
    });

    //make and append edit button
    const editBtn = document.createElement('button');
    
    editBtn.className = "edit-expense";
    editBtn.innerText = "Edit";
    expenseLi.appendChild(editBtn);

    //edit event
    editBtn.expense = expense;
    editBtn.addEventListener('click', (e) => {
        const expenseLi = e.target.parentNode;
        console.log("editing");
        const editBtn = e.target;
        console.log(editBtn.expense)
        editBtn.style.display = 'none';
        
        const doneBtn = document.createElement('button');
        doneBtn.className = 'edit-expense';
        doneBtn.innerText = "Done";
        expenseLi.appendChild(doneBtn);
        doneBtn.expense = editBtn.expense;
        
        //prefill input boxes
        expenseAmountInput.value = editBtn.expense.amount;
        descriptionInput.value = editBtn.expense.description;
        categoryInput.value = editBtn.expense.category;
                     

        doneBtn.addEventListener('click', (e) => {
            console.log(expenseAmountInput)
            const doneBtn = e.target;
            //get new input
            const newAmount = expenseAmountInput.value;
            const newDesc = descriptionInput.value;
            const newCategory = categoryInput.value;
            const newObj = {amount: newAmount, description: newDesc, category: newCategory};
            axios.put(`https://crudcrud.com/api/ac0ff283c3b2478b9a504228642336f7/expenses/${doneBtn.expense._id}`,newObj)
            .then(() => {
                doneBtn.remove();
                location.reload();
            })
            .catch(err => console.log(err));
        });
    });

    //append li to expenseList ul
    expenseList.appendChild(expenseLi)
    
}

