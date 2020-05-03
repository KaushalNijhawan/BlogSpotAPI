const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    name:String,
    description:String
});

module.exports = mongoose.model('Blog' , BlogSchema);