const userRouter = require('./module/user/userRouter');

const router = require('express').Router();

router.use('/user', userRouter)

module.exports = router;