const Expense = require("../models/Expense");

exports.postAddExpense = (req, res, next) => {
  Expense.create({ ...req.body })
    .then((expenses) => res.json(expenses.dataValues))
    .catch((err) => console.log(err));
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => res.json(expenses))
    .catch((err) => console.log(err));
};

exports.putEditExpense = (req, res, next) => {
  const id = req.params.id;
  console.log(req.body);
  Expense.findByPk(id)
    .then((expense) => {
      expense.amount = req.body.amount;
      expense.description = req.body.description;
      expense.category = req.body.category;
      return expense.save();
    })
    .then((expense) => res.json(expense))
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => expense.destroy())
    .then(() => res.status(200))
    .catch((err) => console.log(err));
};
