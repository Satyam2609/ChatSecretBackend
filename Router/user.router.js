import {Router} from 'express'
import { loginUser, registerUser } from '../controller/user.controller.js'
import { upload } from '../middleware/Multer.middleware.js';
import { verifyUser} from '../middleware/auth.middleware.js';
import { getUsername } from '../middleware/getusername.js';
import { loggout } from '../controller/user.controller.js';
import {UserProfile, updateProfile, userAcceptRequest, userFetchRequest } from '../controller/Chat.controller.js';
const router = Router()

router.route("/signUp").post(upload.single("avatar"), registerUser);
router.route("/login").post(  loginUser)
router.route("/username").get(getUsername)
router.route("/loggout").post(verifyUser, loggout)
router.route("/profile").get(verifyUser , UserProfile)
router.route("/UpdateProfile").put(upload.single("avatar"),verifyUser, updateProfile)
router.route("/userFetchRequest").get(verifyUser , userFetchRequest)
router.route("/userAcceptInGroup").post(userAcceptRequest)
export default router