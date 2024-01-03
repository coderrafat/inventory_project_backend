const { isLoggedIn } = require('../../middlewares/auth');
const { purchaseCreateController, purchaseFindController } = require('./purchaseController');

const purchaseRouter = require('express').Router();

purchaseRouter.post('/create', isLoggedIn, purchaseCreateController);

purchaseRouter.get('/', isLoggedIn, purchaseFindController);

module.exports = purchaseRouter;