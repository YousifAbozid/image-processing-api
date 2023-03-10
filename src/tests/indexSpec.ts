import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';
import processImage from '../processImage';

const request = supertest(app);

// Test the paths
describe('Test the root path', (): void => {
  it('Get the root endpoint', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.text).toContain('Server Is Running!');
  });

  it('Get the images endpoint', async (): Promise<void> => {
    const response = await request.get('/images');
    expect(response.text).toContain('Available images to search:');
  });
});

// Test the image processing
describe('Test image processing', (): void => {
  const filename = 'fjord';
  const width = 1000;
  const height = 1000;
  const outputThumbPath =
    path.join(__dirname, '../../assets/thumb', filename) +
    `-${width}-${height}.jpg`;
  const outputFullImagePath =
    path.join(__dirname, '../../assets/full', filename) + '.jpg';

  it('Get the image with a proper filename', async (): Promise<void> => {
    await request.get(`/images?filename=${filename}`);
    expect(fs.existsSync(outputFullImagePath)).toBeTrue();
  });

  it('Return a proper error message when the image does not exist', async (): Promise<void> => {
    const response = await request.get('/images?filename=test');
    expect(response.status).toBe(400);
  });

  it('Resize an image when proper parameters are set in the url', async (): Promise<void> => {
    await request.get(
      `/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(fs.existsSync(outputThumbPath)).toBeTrue();
  });

  it('The image is generated after it\'s deletion', async (): Promise<void> => {
    // Delete the image if it exists
    if (fs.existsSync(outputThumbPath)) {
      fs.unlinkSync(outputThumbPath);
    }

    // generate a new image
    await request.get(
      `/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(fs.existsSync(outputThumbPath)).toBeTrue();
  });

  // Test the processImage sharp function correctly
  it('Return the output image correct so sharp function works', async (): Promise<void> => {
    const response = await processImage(filename, width, height);
    expect(response).toBe(outputThumbPath);
  });

  // Test the processImage sharp function uncorrectly
  it('Return error when passing wrong parameters to sharp function', async (): Promise<void> => {
    const response = await processImage('test', 0, 0);
    expect(response).toBe(400);
  });
});
