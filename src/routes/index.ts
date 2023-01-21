import express from 'express';
import fs from 'fs';
import path from 'path';
import processImage from '../processImage';

const routes = express.Router();

// Root endpoint`
routes.get('/', (req, res) => res.send('Server Is Running!'));

// Images endpoint
routes.get(
  '/images',
  async (req: express.Request, res: express.Response): Promise<void> => {
    // Get all images from the assets folder
    const images = fs.readdirSync(path.join(__dirname, '../../assets/full'));
    const imageNames = images.map((image) => image.split('.')[0]);

    // Get the query params
    const { filename, width, height } = req.query;
    const filenameToString = filename as string;
    const widthToNumber = Number(width);
    const heightToNumber = Number(height);

    // checks if the image exists
    if ((filename && !width) || !height) {
      // get the image from the assets folder
      const image = path.join(
        __dirname,
        '../../assets/full',
        `${filenameToString}.jpg`
      );
      // If the image exists, send it
      if (fs.existsSync(image)) {
        res.sendFile(image);
      } else {
        // If the image doesn't exist, return all avilable images links
        res.status(400).send(
          `<div>There is no image with that name (${
            filenameToString ? filenameToString : ''
          }) <br> <br> Available images to search: <br>
        ${imageNames.map(
          (image) =>
            `<br>
          <a href="http://localhost:3000/images?filename=${image}">http://localhost:3000/images?filename=${image}</a>`
        )}
        <br> <br> Or search with width and height: <br>
        ${imageNames.map(
          (image) =>
            `<br>
            <a href="http://localhost:3000/images?filename=${image}&width=100&height=100">http://localhost:3000/images?filename=${image}&width=100&height=100</a></a>`
        )}
        </div>`
        );
      }
    } else if (filename && width && height) {
      const image = path.join(
        __dirname,
        '../../assets/thumb',
        `${filenameToString}-${widthToNumber}-${heightToNumber}.jpg`
      );

      try {
        // If the image exists, send it
        if (fs.existsSync(image)) {
          res.sendFile(image);
        } else {
          const resizedImage = await processImage(
            filenameToString,
            widthToNumber,
            heightToNumber
          );
          res.sendFile(resizedImage as string);
        }
      } catch (error) {
        // If the image doesn't exist, return all avilable images links
        res.status(400).send(
          `<div>There is no image with that name (${
            filenameToString ? filenameToString : ''
          }) <br> <br> Available images to search: <br>
        ${imageNames.map(
          (image) =>
            `<br>
          <a href="http://localhost:3000/images?filename=${image}">http://localhost:3000/images?filename=${image}</a>`
        )}
        <br> <br> Or search with width and height: <br>
        ${imageNames.map(
          (image) =>
            `<br>
            <a href="http://localhost:3000/images?filename=${image}&width=100&height=100">http://localhost:3000/images?filename=${image}&width=100&height=100</a></a>`
        )}
        </div>`
        );
      }
    }
  }
);

export default routes;
