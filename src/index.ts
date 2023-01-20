import express from 'express' // Import express

const app = express() // Create a new express app instance
const port = 3000 // The port the express app will listen on

// Root endpoint
app.get('/', (req, res) => res.send('Server Is Running!'))

// The express app will listen on the port
app.listen(port, () =>
  console.log(
    `Server running on port ${port} \nClick on the link to visit it ==> (http://localhost:${port})`
  )
)
