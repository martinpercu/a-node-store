const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 12;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.urlPicsumPhotos()
    })
  }
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Je suis un filter');
})

router.get('/:id', (req, res) => {
  // const id = req.params.id; // This is the same
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 150
    })
})

// app.get('/products/filter', (req, res) => {
//   res.send('Je suis un filter');
// })

module.exports = router;
