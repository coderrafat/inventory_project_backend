const { userRegisterController, userLoginController, userSentOtpController } = require('./userController');

const userRouter = require('express').Router();

userRouter.post('/register', userRegisterController);

userRouter.post('/login', userLoginController);

userRouter.post('/send-otp', userSentOtpController);

userRouter.get('/test', (req, res) => {
    res.send('Success on deploy backend to vercel')
})


module.exports = userRouter;