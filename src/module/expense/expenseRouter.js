const { isLoggedIn } = require('../../middlewares/auth');
const { expenseCreateController, expenseUpdateController, expenseFindController } = require('./expenseController');

const expenseRouter = require('express').Router();

expenseRouter.post('/create', isLoggedIn, expenseCreateController);

expenseRouter.put('/update/:expenseId', isLoggedIn, expenseUpdateController);

expenseRouter.get('/', isLoggedIn, expenseFindController);

module.exports = expenseRouter;