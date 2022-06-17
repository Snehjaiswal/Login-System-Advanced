/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:52 pm
 */

"use strict";

const router = require("express").Router();
const otpUtil = require("../utils/otp.util");

router.post("/generate-otp", generateOTP);
router.post("/verify-otp", validateOTP);

async function generateOTP(req, res) {
	const { email } = req.body;
	const response = await otpUtil.generateOTP(email);
	res.send(response);
}

async function validateOTP(req, res) {
	const { email, otp, hash } = req.body;
	const response = await otpUtil.validateOTP(email, otp, hash);
	res.send(response);
}

module.exports = router;