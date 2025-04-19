// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    // In a real application, you might want to:
    // 1. Store file info in database
    // 2. Process the image (resize, optimize)
    // 3. Upload to cloud storage (AWS S3, Google Cloud Storage, etc.)
    return file.filename;
  }

  async getFile(filename: string): Promise<string> {
    const path = join(process.cwd(), 'uploads', 'cv-images', filename);
    try {
      await fs.access(path);
      return path;
    } catch {
      throw new Error('File not found');
    }
  }
}
