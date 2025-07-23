const mongoose = require("mongoose");
const debuglog=require("debug")("development:mongooseconfig");
require('dotenv').config();
const url=process.env.db_url;

mongoose.connect(process.env.localdb_url);
// mongoose.connect(url);
const db = mongoose.connection;

db.on("error",function(err){
    debuglog(err);
})
db.on("open",function(){
    debuglog("connected to the database");
})

module.exports=db;
