import { v2 as cloudinary } from "cloudinary";
import CustomError from "./customError.js";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

/* upload the image into cloudinary using stream */
const uploadImage = async (image) => {
    const buffer = image.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = new Promise((res, rej) => {
        cloudinary.uploader.upload_stream({folder: 'taks', resource_type: 'image'}, (err, uploadResult) => {
            if (err) {
                return rej(new CustomError(`Image upload failed ${err.message}`, 500));
            }
            return res(uploadResult);
        }).end(buffer);
    })

    return uploadImage;
}

export default uploadImage;