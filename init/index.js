const mongoose = require("mongoose");
const initData = require("./data.js");            //   ./ = “start from the folder where this file is”
const Listing = require("../models/listing.js");  //   ../ = “go up one folder, then continue”

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(MONGO_URL);
};

//function for initialise  data

const initDB= async() => {
    // in first if any data is exist in db then delete it then initialise data
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "68c9ae06e6cf42426d3bc1db"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialise")
};

// call function 

initDB();