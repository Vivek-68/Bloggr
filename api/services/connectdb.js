const mongoose = require('mongoose');

async function connectDB(uri){
try{
    await mongoose.connect(uri);
    console.log("Connected to database")
}
catch(e){
    console.log(e.message);
}
}

module.exports = connectDB;