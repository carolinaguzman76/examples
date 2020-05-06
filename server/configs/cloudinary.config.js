const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.Cloud_name,
    api_key: process.env.API_Key,
    api_secret: process.env.API_Secret
});

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'movements',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, res, cb) {
        cb(null, res.originalname);
    }
});

const uploader = multer({ storage });
module.exports = uploader;

