import supertest from 'supertest'
import fs from 'fs'
import path from 'path'
import app from '../index'

const request = supertest(app)

// Test the paths
describe('Test the root path', () => {
  it('Get the root endpoint', async () => {
    const response = await request.get('/')
    expect(response.text).toContain('Server Is Running!')
  })

  it('Get the images endpoint', async () => {
    const response = await request.get('/images')
    expect(response.text).toContain('Available images to search:')
  })
})

// Test the image processing
describe('Test image processing', () => {
  const filename = 'fjord'
  const width = '1000'
  const height = '1000'
  const outputThumbPath =
    path.join(__dirname, '../../assets/thumb', filename) +
    `-${width}-${height}.jpg`
  const outputFullImagePath =
    path.join(__dirname, '../../assets/full', filename) + `.jpg`

  //console.log(outputFullImagePath)

  it('Get the image with a proper filename', async () => {
    const response = await request.get(`/images?filename=${filename}`)
    expect(fs.existsSync(outputFullImagePath)).toBeTrue()
  })

  it('Return a proper error message when the image does not exist', async () => {
    const response = await request.get(`/images?filename=test`)
    expect(response.status).toBe(400)
  })

  it('Resize an image when proper parameters are set in the url', async () => {
    await request.get(
      `/images?filename=${filename}&width=${width}&height=${height}`
    )
    expect(fs.existsSync(outputThumbPath)).toBeTrue()
  })
})
