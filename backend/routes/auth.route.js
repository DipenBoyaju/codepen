import express from 'express'
import { github, google, login, logout, signup } from '../controllers/auth.controller.js'


const router = express.Router()


router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/google').post(google);
router.route('/github').post(github);

export default router