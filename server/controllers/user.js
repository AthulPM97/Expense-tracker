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
