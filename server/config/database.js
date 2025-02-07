const mongoose = require('mongoose');
require('dotenv').config();

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASEURL)
    .then(()=>{
        console.log('Connection Established Successfully');
    })
    .catch((error)=>{
        console.log("Issue in DB Connection");
        console.log(error);
        process.exit(1);
    });
}
module.exports = dbconnect;