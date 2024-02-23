const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

let order = null;
let orderBig =null
// Routes


app.post('/receive-order', (req, res) => {

orderBig= req.body
console.log("receiving bread order")
console.log(orderBig); 
res.json(orderBig);
});

app.post('/bread/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received a login request in bread');
  // Check if the username and password are both "admin"
  if (username === 'breadAdmin' && password === 'breadAdmin') {
    res.status(200).json({ success: true }); // Send success response on successful login
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' }); // Send error response on unsuccessful login
  }
});



app.get('/show-order', (req, res) => {
  if (orderBig) {
    console.log(orderBig)
    res.json(orderBig);
  } else {
    res.status(404).json({ error: 'No big order data found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Bread System running on port ${port}`);
});