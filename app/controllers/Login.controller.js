/*
 * Title:   Login System Advanced 
 * Author:     Sneh Jaiswal
 * Created On: Fri Jun 17 2022 10:50:45 am
 */


"use strict";

const LoginModel = require("../models/Login.model");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;

const sendMail = require("../utils/sendEmail.util");
const OtpUtil = require("../utils/otp.util")

// LOGIN CLASS
class Login {
    async signup(req, res) {
        const uniqueID = uuid();
        try {
            const { Name, email, password, cpassword } = req.body;

            // CHECK ALL FIELD IN FILL
            if (!Name || !email || !password || !cpassword)
                return res.status(400).json({ msg: "Please fill in all fields." });


            // EMAIL VALIDATER
            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." });


            // CHECK EMAIL IS ALREADY EXISTS ARE NOT
            const user = await LoginModel.findOne({ email });

            // TTL INDEX USE
            if (user)
                return res.status(400).json({ msg: "This email already exists." });

            // CHECK PASSWORD LENGTH
            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters." });

            //Hash password
            const passwordHash = await bcrypt.hash(password, 10);
            const cpasswordHash = await bcrypt.hash(cpassword, 10);

            // It's help Otp generater
            const { otp, expires } = await OtpUtil.generateOTP(email);
            // console.log({ otp, expires })

            const url = ` OTP: ${otp} `; //url for email

            // it's help send mail
            sendMail.sendVerificationMail(email, url, "Verify your email address");

            // it's help save data in db
            const newUser = new LoginModel({
                uniqueID,
                Name,
                email,
                password: passwordHash,
                cpassword: cpasswordHash,
                isVerifyed: false,
                otp,
                expires,
            });

            //STORE YOUR LOGIN DATA IN DB 
            await newUser.save();
            console.log({ newUser });

            res.json({
                status: "panddig",
                msg: "Register Success! Please activate your email to start.",
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    

    //otp verifed
    async VerifyedOTP(req, res) {
        const { email, otp } = req.body;


        const isValid = await LoginModel.findOne({ email: email });
        // console.log({ isValid });


        // CHECK OTP  EXPIRE IS VALID OR NOT
        const now = Date.now();
        if (now > + isValid.expires) {
            res.json({
                verification: false,
                msg: "OTP Expired!",
            })
        }


        if (otp === isValid.otp) {
            res.status(200).json({ msg: "Otp is Corect" });

            const verifyAccount = LoginModel.findOneAndUpdate({ email: email }, { $set: { isVerifyed: true } })
                .then(() => {

                    console.log("successfully verifed");
                }).catch((err) => {
                    console.log(err);
                })

        } else {
            res.status(400).json({ msg: "Otp is incorect" });
        }

    }
    
    // student signin information
    async signin(req, res) {
        try {
            const { email, password } = req.body;

            // check if user exist
            const user = await LoginModel.findOne({
                $and: [
                    { email: email },
                    { isVerifyed: true }
                ]
            });

            //  CHECK EMAIL IS VALID OR NOT
            if (!user)
                return res.status(400).json({ msg: "This email in not Verified." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            res.json({ msg: "Login success!" });
            console.log(`Login Success!`);


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    // FORGET PASSWORD
    async Forgot_Password(req, res) {

        try {
            const { email } = req.body;
            const user = await LoginModel.findOne({
                $and: [
                    { email: email },
                    { isVerifyed: true }
                ]
            });
            if (!user)
                return res.status(400).json({ msg: "This email in not Verified." });

            const { otp, expires } = await OtpUtil.generateOTP(email);
            console.log({ otp, expires })

            const url = ` OTP: ${otp} `; //url for email

            // it's help send mail
            sendMail.sendVerificationMail(email, url, "Verify your email address");
            console.log("OTP SEND");

            const updateOtp = LoginModel.updateMany({ email: email }, { $set: { otp: otp } }, { expires: expires }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated Docs : ", docs);
                }
            })
                .then(() => {

                    console.log("successfully verifed");
                }).catch((err) => {
                    console.log(err);
                })

            // // Verify otp
            // const VerifyOtp = await VerifyedOTP(otp);
            // console.log(verifyOtp);


        } catch (err) {
            return res.status(500).json({ msg: err.message });
            console.log(err);
        }

    }












}

// // email validation
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = new Login();
