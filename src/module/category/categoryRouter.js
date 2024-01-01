
const { isLoggedIn } = require('../../middlewares/auth');
const { categoryCreateController, categoryUpdateController, categoryFindController, categoryDropdownController } = require('./categoryController');

const categoryRouter = require('express').Router();

categoryRouter.post('/create', isLoggedIn, categoryCreateController);

categoryRouter.put('/update/:categoryId', isLoggedIn, categoryUpdateController);

categoryRouter.get('/', isLoggedIn, categoryFindController);

categoryRouter.get('/dropdown', isLoggedIn, categoryDropdownController);


module.exports = categoryRouter;