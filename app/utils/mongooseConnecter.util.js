/*
 * Title:   ITEG Management System
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:52:04 pm
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
