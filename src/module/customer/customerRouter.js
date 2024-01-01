
const { isLoggedIn } = require('../../middlewares/auth');
const { customerCreateController, customerUpdateController, customerFindController, customerDropdownController } = require('./customerController');

const customerRouter = require('express').Router();

customerRouter.post('/create', isLoggedIn, customerCreateController);

customerRouter.put('/update/:customerId', isLoggedIn, customerUpdateController);

customerRouter.get('/', isLoggedIn, customerFindController);

customerRouter.get('/dropdown', isLoggedIn, customerDropdownController);


module.exports = customerRouter;