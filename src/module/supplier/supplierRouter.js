
const { isLoggedIn } = require('../../middlewares/auth');
const { supplierCreateController, supplierUpdateController, supplierFindController, supplierDropdownController, supplierDeleteController } = require('./supplierController');

const supplierRouter = require('express').Router();

supplierRouter.post('/create', isLoggedIn, supplierCreateController);

supplierRouter.put('/update/:supplierId', isLoggedIn, supplierUpdateController);

supplierRouter.get('/', isLoggedIn, supplierFindController);

supplierRouter.get('/dropdown', isLoggedIn, supplierDropdownController);

supplierRouter.delete('/delete/:id', isLoggedIn, supplierDeleteController);


module.exports = supplierRouter;