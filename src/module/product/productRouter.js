const { isLoggedIn } = require('../../middlewares/auth');
const { productCreateController, productUpdateController, productFindController } = require('./productController');

const productRouter = require('express').Router();

productRouter.post('/create', isLoggedIn, productCreateController);

productRouter.put('/update/:productId', isLoggedIn, productUpdateController);

productRouter.get('/', isLoggedIn, productFindController);

module.exports = productRouter;