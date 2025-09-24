const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");

//schema

const listingSchema=new Schema({
    title:{
        type:String,
        required: true,
    },
    description: String,
    image:{
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,  //one to many - store reference
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // category: {
    //     type: String,
    //     enum: ["mountens", "arctic", "farms", "trending", "iconic cities", "castle", "camping"],
    // }
});


//for delete listing reviews if we delete hole listing
//mongoose middleware
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({ _id: {$in: listing.reviews}});
    }
});

//model

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;