//selectors
var expenseAmountInput = document.getElementById("expense-amount");
var descriptionInput = document.getElementById("description");
var categoryInput = document.getElementById("category");
var addExpenseBtn = document.getElementById("add-expense");
var expenseList = document.querySelector(".expense-list");

//get all stored expenses from crudcrud and display it on page

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/expenses");
    const expenses = response.data;
    expenses.forEach((expense) => {
      addElementsAndButtons(expense);
    });
  } catch (err) {
    console.log(err);
  }
});

//event listeners
addExpenseBtn.addEventListener("click", addExpense);

//functions
async function addExpense(e) {
  e.preventDefault();
  //create expense object
  const amount = expenseAmountInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  if (!amount && !description) {
    //if no input
    alert("Invalid details!");
  } else {
    try {
      const expenseObject = { amount, description, category };
      const response = await axios.post(
        "http://localhost:3000/user/add-expense",
        expenseObject
      );
      addElementsAndButtons(response.data);
    } catch (err) {
      console.log(err);
    }
  }
}

function addElementsAndButtons(expense) {
  //one expense Item is 1 li with 3 <p> tags and 2 buttons
  //create list item
  const expenseLi = document.createElement("li");
  expenseLi.style.width = "300px";
  expenseLi.className = "expense-item";
  //amount text node
  const amountNode = document.createElement("p");
  amountNode.innerText = "Amount: " + expense.amount;
  //description text node
  const descriptionNode = document.createElement("p");
  descriptionNode.innerText = "Description: " + expense.description;
  //category text node
  const categoryNode = document.createElement("p");
  categoryNode.innerText = "Category: " + expense.category;
  //append to expenseLI
  expenseLi.append(amountNode, descriptionNode, categoryNode);

  //make and append delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-expense";
  deleteBtn.innerText = "Delete";
  expenseLi.appendChild(deleteBtn);
  //delete event
  deleteBtn.addEventListener("click", async (e) => {
    try {
      const item = e.target.parentNode;
      const response = await axios.delete(
        `http://localhost:3000/user/delete-expense/${expense.id}`
      );
      //remove from page
      if (response.ok) item.remove();
    } catch (err) {
      console.log(err);
    }
  });

  //make and append edit button
  const editBtn = document.createElement("button");

  editBtn.className = "edit-expense";
  editBtn.innerText = "Edit";
  expenseLi.appendChild(editBtn);

  //edit event
  editBtn.expense = expense;
  editBtn.addEventListener("click", async (e) => {
    const expenseLi = e.target.parentNode;
    console.log("editing");
    const editBtn = e.target;
    console.log(editBtn.expense);
    //hide edit button
    editBtn.style.display = "none";

    //create and append done button
    const doneBtn = document.createElement("button");
    doneBtn.className = "edit-expense";
    doneBtn.innerText = "Done";
    expenseLi.appendChild(doneBtn);
    doneBtn.expense = editBtn.expense;

    //prefill input boxes
    expenseAmountInput.value = editBtn.expense.amount;
    descriptionInput.value = editBtn.expense.description;
    categoryInput.value = editBtn.expense.category;

    //done button click event
    doneBtn.addEventListener("click", async (e) => {
      try {
        const doneBtn = e.target;
        //get new input
        const newAmount = expenseAmountInput.value;
        const newDesc = descriptionInput.value;
        const newCategory = categoryInput.value;
        const newObj = {
          amount: newAmount,
          description: newDesc,
          category: newCategory,
        };
        const response = await axios.put(
          `http://localhost:3000/user/expenses/${doneBtn.expense.id}`,
          newObj
        );
        doneBtn.remove();
        location.reload();
      } catch (err) {
        console.log(err);
      }
    });
  });

  //append li to expenseList ul
  expenseList.appendChild(expenseLi);
}
