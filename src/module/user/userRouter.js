const { userRegisterController, userLoginController, userSentOtpController } = require('./userController');

const userRouter = require('express').Router();

userRouter.post('/register', userRegisterController);

userRouter.post('/login', userLoginController);

userRouter.post('/send-otp', userSentOtpController);


module.exports = userRouter;