/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:45 pm
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