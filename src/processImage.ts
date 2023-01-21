import path from 'path';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import fs from 'fs';

// Resize the image and save it in the thumb folder
const processImage = async (
  filename: string,
  width: number,
  height: number
) => {
  const image = path.join(__dirname, '../assets/full', `${filename}.jpg`);
  const thumbFolder: string = path.join(__dirname, '../assets/thumb');
  const imageOutput: string =
    path.join(__dirname, '../assets/thumb', filename) +
    `-${width}-${height}.jpg`;

  // If thumb folder doesn't exist, create it
  if (!fs.existsSync(thumbFolder)) {
    await fsPromises.mkdir(thumbFolder);
  }

  try {
    // Resize the image and return the resized image
    await sharp(image).resize(width, height).toFile(imageOutput);
    return imageOutput;
  } catch (error) {
    // If it fails, returns the error
    return error;
  }
};

export default processImage;
