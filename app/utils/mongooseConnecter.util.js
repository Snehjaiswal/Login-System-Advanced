/*
 * Title:  Login System Advanced 
 * Author:     Sneh Jaiswal
 * Created On: Fri Jun 17 2022 10:56:54 am
 */


"use strict";

const { connect, connection } = require("mongoose");
const { dbUri, dbName } = require("../../config");

connect(dbUri, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  connection.useDb(dbName);
  console.log("Connected to MongoDB");
});
