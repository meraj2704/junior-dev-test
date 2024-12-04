import multer from 'multer';
import { Request } from 'express';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// coudinary image store setup

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API Secret
});

//  image storage setup

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: async (req: Request, file: Express.Multer.File) => {
    return {
      folder: 'uploads',  // Specify the folder in Cloudinary
      format: file.mimetype.split('/')[1], // Use the file's original extension
      public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}` // Generate a unique filename
    };
  },
});

const upload = multer({ storage });

export default upload;
