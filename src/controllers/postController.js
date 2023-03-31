require("dotenv").config();
const {GridFSBucket, MongoClient} = require("mongodb");
const mongoClient = new MongoClient(process.env.DATABASE_URL);
const Post = require("../models/post");
const controller = {};

controller.get = async (req,res)=>{
    try {
        let posts = await Post.find();
        res.status(200).json({status: "Success", result: posts});    
    } 
    catch(error){
        res.status(400).json({status: "Failed", result: error.message});
    }
}

controller.post = async (req, res)=>{
    try{
        let newPost = await new Post({
            ...req.body,
            image: `images/${req.file.filename}`
        })
        newPost = await newPost.save();
        res.status(200).json({status: "Success", result: newPost});
    } 
    catch(error){
        res.status(400).json({status: "Failed", result: error.message})
    }
}

controller.download = async (req,res)=>{
    try {
        await mongoClient.connect();
        const db = mongoClient.db(process.env.DB_NAME);
        const bucket = new GridFSBucket(db, {
            bucketName: process.env.DB_COLLECTION
        });
        const image = bucket.openDownloadStreamByName(req.params.name);
        image.on("data", data => res.status(200).write(data))
        image.on("error", (error) => {
            res.status(400).send({status: "Failed" , message: error.message})
        });
        image.on("end", () => res.end());
    } 
    catch(error){
        res.status(500).send({message: error.message});
    }
}

module.exports = controller;