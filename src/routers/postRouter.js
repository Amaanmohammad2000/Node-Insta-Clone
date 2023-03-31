require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const controller = require("../controllers/postController");

const fileStorage = new GridFsStorage({
    url: process.env.DATABASE_URL + process.env.DB_NAME,
    file: (req, file) => {
        return {
            bucketName : process.env.DB_COLLECTION,
            filename : `${Date.now()}_${file.originalname}`
        }
    }
});
const fileUpload = multer({
    storage: fileStorage
});

router.post("/post", fileUpload.single("image"), controller.post);
router.get("/posts", controller.get);
router.post("/images/:name", controller.download);

module.exports = router;