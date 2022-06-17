/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:52:18 pm
 */

"use strict";

require("dotenv").config();

const config = {
  port: process.env.PORT,

  dbUri: process.env.MONGO_URI,
  dbName: process.env.MONGO_DB_NAME,
  BUCKET: process.env.BUCKET,
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
  fromEmail: process.env.AUTH_EMAIL,
  fromEmailPassword: process.env.AUTH_PASS,
};

module.exports = config;
