const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/add-expense', userController.postAddExpense);

router.get('/user/expenses', userController.getExpenses);

router.put('/user/expenses/:id', userController.putEditExpense);

router.delete('/user/delete-expense/:id', userController.deleteExpense);

module.exports = router;