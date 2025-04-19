// src/config/multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

const publicUploadsPath = (subfolder: string) =>
  `./public/uploads/${subfolder}`;

export const cvImageUploadConfig = {
  storage: diskStorage({
    destination: publicUploadsPath('cv-images'),
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedExtensions = ['.jpeg', '.jpg', '.png'];
    const ext = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return callback(
        new Error('Seuls les fichiers JPEG, JPG et PNG sont autorisés'),
        false,
      );
    }
    callback(null, true);
  },
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
};

// Configuration pour d'autres types d'uploads
export const otherUploadConfig = {
  storage: diskStorage({
    destination: publicUploadsPath('autres-uploads'),
    filename: (req, file, callback) => {
      // ... même pattern
    },
  }),
  // ... autres options
};
