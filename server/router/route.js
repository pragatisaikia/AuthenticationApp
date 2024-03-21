import { Router } from "express";
const router = Router();


/**import all controllers */
import * as controller from '../controllers/appController.js'
import { registerMail } from "../controllers/mailer.js";
import Auth, {localVariables} from "../middleware/auth.js";

/**POST methods */
router.route('/register').post(controller.register)
router.route('/registerMail').post(registerMail) ; //send the email
router.route('/authenticate').post(controller.verifyUser,(req,res) =>res.end()); //authentica user
router.route('/login').post(controller.verifyUser, controller.login); //login in app

/**GET Methods */
router.route('/user/:username').get(controller.getUser) //user with username
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP) //generate random OTP
router.route(controller.verifyUser,'/verifyOTP').get(controller.verifyOTP) //verify generated OTP
router.route('/user/createResetSession').get(controller.createResetSession) //reset all variables


/**PUT Methods */
router.route('/updateuser').put(Auth,controller.updateUser); //update user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); //used to reset password

export default router  
