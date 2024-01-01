const { isLoggedIn } = require('../../middlewares/auth');
const { imageUpload } = require('../../middlewares/imageUpload');
const { parseFormData } = require('../../middlewares/parseFormData');
const { userRegisterController, userLoginController, userProfileController, userProfileUpdateController, userPasswordUpdateController, userEmailVerifyController, userEmailUpdateController, userPasswordResetController } = require('./userController');
const { userProfileUpdateSchema } = require('./userValidationSchema');

const userRouter = require('express').Router();

userRouter.post('/register', userRegisterController);

userRouter.post('/verify', userEmailVerifyController);

userRouter.post('/login', userLoginController);

userRouter.get('/profile', isLoggedIn, userProfileController);

userRouter.put('/profile/update', isLoggedIn, userProfileUpdateController);

userRouter.put('/password/update', isLoggedIn, userPasswordUpdateController);

userRouter.put('/password/reset', userPasswordResetController);

userRouter.put('/email/update', isLoggedIn, userEmailUpdateController);



module.exports = userRouter;