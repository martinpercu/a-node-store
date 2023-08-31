const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Je suis un serveur en Express')
})

app.get('/new-endpoint', (req, res) => {
  res.send('Hello Je suis un nouveau ENDPOINT')
})

app.get('/products', (req, res) => {
  res.json({
    name: 'Product 1',
    price: 150
  })
})

app.listen(port, () => {
  console.log('this is running in port ' + port);
})
