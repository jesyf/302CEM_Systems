const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(cors());
const breadSystemURL = 'http://localhost:4000'; // URL of the bread system

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received a login request');
  // Check if the username and password are both "admin"
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ success: true }); // Send success response on successful login
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' }); // Send error response on unsuccessful login
  }
});



app.post('/logout', (req, res) => {
  // Perform logout actions
  // Return appropriate response
});

app.post('/order', (req, res) => {
  const { breadType, quantity } = req.body;
  // Forward the order to the bread system for processing
  axios.post(`${breadSystemURL}/receive-order`, { breadType, quantity })
    .then((response) => {
      // Handle the response from the bread system
      res.json({ message: 'Order placed successfully' });
    })
    .catch((error) => {
      // Handle errors
      res.status(500).json({ error: 'Failed to place the order' });
    });
});

app.post('/place-order', (req, res) => {
  const orderData = req.body.orderList;
  console.log(orderData)
  axios.post(`${breadSystemURL}/receive-order`, orderData)
  .then((response) => {
    // Handle the response from the bread system
    res.json({ message: 'Big order placed successfully' });
  })
  .catch((error) => {
    // Handle errors
    res.status(500).json({ error: 'Failed to place the order' });
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Fast Food System running on port ${port}`);
});