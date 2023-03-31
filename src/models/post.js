const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    id:{
        type: Number,
        required: true
    }
}, {timestamps: true});

const Post = new mongoose.model("posts", post_schema);
module.exports = Post;