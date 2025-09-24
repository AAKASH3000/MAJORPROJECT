const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
});

// Apply plugin on schema, not on model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);