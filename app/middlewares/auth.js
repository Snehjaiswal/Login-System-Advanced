/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:51:04 pm
 */

"use strict"
const jwt = require('jsonwebtoken')

require('dotenv').config()
 

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "1 Invalid Authentication."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth