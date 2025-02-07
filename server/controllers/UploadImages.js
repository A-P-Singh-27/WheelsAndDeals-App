const cloudinary = require('cloudinary').v2;

// Upload Controller
const uploadImage = async (req, res) => {
    // console.log("hello" , req.files);
    
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(401).json({ success: false, message: 'No files were uploaded.' });
        }

        const images = req.files.images; // `images` is the field name
        const uploadedImages = [];
        console.log(images);
        

        // Handle both single and multiple file uploads
        const filesArray = Array.isArray(images) ? images : [images];

        for (let file of filesArray) {
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'car_images', // Adjust the folder name as needed
            });
            uploadedImages.push(result.secure_url);
        }

        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            data: uploadedImages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Image upload failed',
            error: error.message,
        });
    }
};

module.exports = { uploadImage };
