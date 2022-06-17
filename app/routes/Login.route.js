/*
 * Title:   Login System Advanced 
 * Author:     Sneh Jaiswal
 * Created On: Fri Jun 17 2022 10:56:30 am
 */

"use strict"

const router = require("express").Router()
const { signup , VerifyedOTP, signin ,Forgot_Password }= require('../controllers/Login.controller')

const auth = require('../middlewares/auth')



router.post('/signup',signup)
router.post('/signin',signin)
router.post('/VerifyedOTP', VerifyedOTP)
router.post('/Forgot_Password', Forgot_Password)
// router.post('/reset',auth, resetPassword)

module.exports = router;