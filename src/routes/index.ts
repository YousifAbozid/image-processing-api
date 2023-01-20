import express from 'express'
import fs from 'fs'
import path from 'path'

const routes = express.Router()

// Root endpoint`
routes.get('/', (req, res) => res.send('Server Is Running!'))

routes.get('/images', (req, res) => {
  if (req.query.filename) {
    const filename = req.query.filename as string
    const image = path.join(
      __dirname,
      '../',
      '../',
      'assets/',
      'full/',
      `${filename}.jpg`
    )

    if (fs.existsSync(image)) {
      res.sendFile(image)
    } else {
      res.send('There is no image with that name')
    }
  }
})

export default routes
