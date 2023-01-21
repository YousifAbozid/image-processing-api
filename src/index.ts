import express from 'express'; // Import express
import routes from './routes'; // Import routes

const app = express(); // Create a new express app instance
const port = 3000; // The port the express app will listen on

app.use('/', routes); // Mount the router on the app

// The express app will listen on the port
app.listen(port, () =>
  console.log(
    `Server running on port ${port} \nClick on the link to visit it ==> (http://localhost:${port})`
  )
);

export default app;
