import {Router} from 'express'
import { loginUser, registerUser } from '../controller/user.controller.js'
import { upload } from '../middleware/Multer.middleware.js';
import { verifyUser} from '../middleware/auth.middleware.js';
import { getUsername } from '../middleware/getusername.js';
import { loggout } from '../controller/user.controller.js';

const router = Router()

router.route("/signUp").post(upload.single("avatar"), registerUser);
router.route("/login").post(  loginUser)
router.route("/username").get(getUsername)
router.route("/loggout").post(verifyUser, loggout)

export default router