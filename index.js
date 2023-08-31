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
  res.json([
    {
    name: 'Product 1',
    price: 150
    },
    {
    name: 'Product 3',
    price: 180
    },
  ])
})

app.get('/products/:id', (req, res) => {
  // const id = req.params.id; // This is the same
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 150
    })
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId,  productId } = req.params;
  res.json({
    categoryId,
    productId
  })
})


app.listen(port, () => {
  console.log('this is running in port ' + port);
})
