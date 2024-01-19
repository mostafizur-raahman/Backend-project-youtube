import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLODINARI_CLOUD_NAME,
    api_key: process.env.CLODINARI_CLOUD_API_KEY,
    api_secret: process.env.CLODINARI_CLOD_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been upload successfully 
        console.log("file has been uploaded successfully", response.url);
        return response;
    } catch (error) {
        // removed the locally saved temp file as the upload operation got failed
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary }