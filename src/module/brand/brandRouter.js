const { isLoggedIn } = require('../../middlewares/auth');
const { brandCreateController, brandUpdateController, brandFindController, brandDropdownController } = require('./brandController');

const brandRouter = require('express').Router();

brandRouter.post('/create', isLoggedIn, brandCreateController);

brandRouter.put('/update/:id', isLoggedIn, brandUpdateController);

brandRouter.get('/', isLoggedIn, brandFindController);

brandRouter.get('/dropdown', isLoggedIn, brandDropdownController);


module.exports = brandRouter