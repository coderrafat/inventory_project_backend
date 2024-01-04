const { isLoggedIn } = require('../../middlewares/auth');
const { purchaseCreateController, purchaseFindController, purchaseDeleteController } = require('./purchaseController');

const purchaseRouter = require('express').Router();

purchaseRouter.post('/create', isLoggedIn, purchaseCreateController);

purchaseRouter.get('/', isLoggedIn, purchaseFindController);

purchaseRouter.delete('/delete/:id', isLoggedIn, purchaseDeleteController);

module.exports = purchaseRouter;