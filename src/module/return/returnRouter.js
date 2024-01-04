const { isLoggedIn } = require('../../middlewares/auth');
const { returnCreateController, returnFindController, returnDeleteController } = require('./returnController');

const returnRouter = require('express').Router();

returnRouter.post('/create', isLoggedIn, returnCreateController);

returnRouter.get('/', isLoggedIn, returnFindController);

returnRouter.delete('/delete/:id', isLoggedIn, returnDeleteController);

module.exports = returnRouter;