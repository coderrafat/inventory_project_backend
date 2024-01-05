
const { isLoggedIn } = require('../../middlewares/auth');
const { customerCreateController, customerUpdateController, customerFindController, customerDropdownController, customerDeleteController } = require('./customerController');

const customerRouter = require('express').Router();

customerRouter.post('/create', isLoggedIn, customerCreateController);

customerRouter.put('/update/:customerId', isLoggedIn, customerUpdateController);

customerRouter.get('/', isLoggedIn, customerFindController);

customerRouter.get('/dropdown', isLoggedIn, customerDropdownController);

customerRouter.delete('/delete/:id', isLoggedIn, customerDeleteController);


module.exports = customerRouter;