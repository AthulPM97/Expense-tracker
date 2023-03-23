const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/add-expense', userController.postAddExpense);

router.get('/user/expenses', userController.getExpenses)

module.exports = router;