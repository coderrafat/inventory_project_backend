const brandRouter = require('./module/brand/brandRouter');
const categoryRouter = require('./module/category/categoryRouter');
const customerRouter = require('./module/customer/customerRouter');
const expenseRouter = require('./module/expense/expenseRouter');
const expenseTypeRouter = require('./module/expense/expenseType/expenseTypeRouter');
const productRouter = require('./module/product/productRouter');
const purchaseRouter = require('./module/purchase/purchaseRouter');
const supplierRouter = require('./module/supplier/supplierRouter');
const userRouter = require('./module/user/userRouter');
const verificationRouter = require('./module/user/verification/verificationRouter');

const router = require('express').Router();

router.use('/user', userRouter);

router.use('/verification', verificationRouter);

router.use('/brand', brandRouter);

router.use('/category', categoryRouter);

router.use('/customer', customerRouter);

router.use('/supplier', supplierRouter);

router.use('/expense-type', expenseTypeRouter);

router.use('/expense', expenseRouter);

router.use('/product', productRouter);

router.use('/purchase', purchaseRouter);


module.exports = router;