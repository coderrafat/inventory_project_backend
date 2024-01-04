const { isLoggedIn } = require('../../middlewares/auth');
const { sellCreateController, sellFindController, sellDeleteController } = require('./sellController');

const sellRouter = require('express').Router();

sellRouter.post('/create', isLoggedIn, sellCreateController);

sellRouter.get('/', isLoggedIn, sellFindController);

sellRouter.delete('/delete/:id', isLoggedIn, sellDeleteController);

module.exports = sellRouter;