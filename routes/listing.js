const express = require("express");
const router = express.Router();  //router object
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isOwner, validationlisting} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isloggedIn, upload.single('listing[image]'), validationlisting, wrapAsync(listingController.createListing));
    
    
//New Route
router.get("/new", isloggedIn,  wrapAsync(listingController.renderNewForm));



router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isloggedIn, isOwner, upload.single('listing[image]'), validationlisting,wrapAsync(listingController.updateListing))
    .delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;