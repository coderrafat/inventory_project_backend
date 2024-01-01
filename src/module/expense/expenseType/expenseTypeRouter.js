const { isLoggedIn } = require('../../../middlewares/auth');
const { expenseTypeCreateController, expenseTypeUpdateController, expenseTypeFindController, expenseTypeDropdownController } = require('./expenseTypeController');

const expenseTypeRouter = require('express').Router();

expenseTypeRouter.post('/create', isLoggedIn, expenseTypeCreateController);

expenseTypeRouter.put('/update/:expenseTypeId', isLoggedIn, expenseTypeUpdateController);

expenseTypeRouter.get('/', isLoggedIn, expenseTypeFindController);

expenseTypeRouter.get('/dropdown', isLoggedIn, expenseTypeDropdownController);


module.exports = expenseTypeRouter;